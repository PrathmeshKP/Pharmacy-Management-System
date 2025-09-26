package com.pharma.orders.controller;

import com.pharma.orders.model.Order;
import org.slf4j.Logger;
import com.pharma.orders.util.LoggerUtil;

import com.pharma.orders.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    private static final Logger logger = LoggerUtil.getLogger(OrderService.class);


    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
    	logger.info("order placed");
        Order placedOrder = orderService.placeOrder(order);
        return ResponseEntity.ok(placedOrder);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
    	logger.info("Fetching all orders from DB");
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/verified")
    public ResponseEntity<List<Order>> getVerifiedOrders() {
    	logger.info("Fetching all orders verified only");
        return ResponseEntity.ok(orderService.getVerifiedOrders());
    }

    @GetMapping("/picked-up")
    public ResponseEntity<List<Order>> getPickedUpOrders() {
    	logger.info("Fetching all orders verified Only");
        return ResponseEntity.ok(orderService.getPickedUpOrders());
    }
    
    @GetMapping("/test-exception")
    public String throwTestException() {
        throw new RuntimeException("This is a test exception from Order Service");
    }
    
    


    @PutMapping("/verify/{id}")
    public ResponseEntity<Order> verifyOrder(@PathVariable Long id) {
    	logger.info("updateing orders");
        Order updatedOrder = orderService.verifyOrder(id);
        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/pickup/{id}")
    public ResponseEntity<Order> markAsPickedUp(@PathVariable Long id) {
    	logger.info("pickuping up orders");
        Order updatedOrder = orderService.markAsPickedUp(id);
        return ResponseEntity.ok(updatedOrder);
    }
}
