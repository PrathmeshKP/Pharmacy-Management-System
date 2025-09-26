package com.pharma.orders.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharma.orders.dto.MedicineDTO;
import com.pharma.orders.dto.OrderMessage;
import com.pharma.orders.dto.SalesReportDTO;
import com.pharma.orders.feign.MedicineFeignClient;
import com.pharma.orders.feign.SalesReportFeignClient;
import com.pharma.orders.messaging.OrderMessageProducer;
import com.pharma.orders.model.Order;
import com.pharma.orders.repository.OrderRepository;
import com.pharma.orders.util.LoggerUtil;



@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private MedicineFeignClient medicineFeignClient;
    
    @Autowired
    private OrderMessageProducer orderMessageProducer;
    
    
    @Autowired
    private SalesReportFeignClient salesReportFeignClient;
    
    private static final Logger logger = LoggerUtil.getLogger(OrderService.class);
    
    public Order placeOrder(Order order) {
    	
    	 order.setPlacedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);

        
        OrderMessage message = new OrderMessage();
        message.setOrderId(savedOrder.getId());
        message.setDoctorEmail(savedOrder.getDoctorEmail());
        message.setDrugIds(savedOrder.getDrugIds()); 
        message.setPlacedAt(Date.from(order.getPlacedAt().atZone(ZoneId.systemDefault()).toInstant()));

        orderMessageProducer.sendOrderMessage(message);

        return savedOrder;
    }
    
    
    public List<Order> getAllOrders() {
        return orderRepository.findByVerifiedFalse();
    }

    public List<Order> getVerifiedOrders() {
        return orderRepository.findByVerified(true);
    }

    public List<Order> getPickedUpOrders() {
        return orderRepository.findByPickedUp(true);
    }

    public Order verifyOrder(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setVerified(true);
            return orderRepository.save(order);
        }
        return null;
    }

    public Order markAsPickedUp(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null && order.isVerified()) {
            order.setPickedUp(true);

            try {
                // 1) Reduce stock in Medicine microservice
                medicineFeignClient.reduceStock(order.getDrugName(), order.getQuantity());

                // 2) Get medicine details from Medicine microservice using get-by-name
                MedicineDTO medicine = medicineFeignClient.getMedicineByName(order.getDrugName());

                if (medicine != null) {
                    // 3) Build SalesReport DTO (orders-microservice copy)
                    com.pharma.orders.dto.SalesReport report = new com.pharma.orders.dto.SalesReport();
                    report.setDrugName(medicine.getName());
                    report.setQuantitySold(order.getQuantity());
                    report.setTotalRevenue(medicine.getPrice() * order.getQuantity());
                    report.setDate(order.getPlacedAt().toLocalDate());

                    // 4) Send report to SalesReport microservice via Feign
                    salesReportFeignClient.addSalesReport(report);
                } else {
                    logger.warn("Medicine not found for name {} when creating sales report for order {}", order.getDrugName(), id);
                }
            } catch (Exception e) {
                logger.error("Error while reducing stock / creating sales report for order {}", id, e);
            }

            return orderRepository.save(order);
        }
        return null;
    }



    
    
}
