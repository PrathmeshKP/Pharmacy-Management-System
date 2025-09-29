package com.pharma.supplierinventory.consumer;

import com.pharma.supplierinventory.config.RabbitMQConfig;

import com.pharma.supplierinventory.model.OrderMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class OrderMessageListener {

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void receiveOrderMessage(OrderMessage message) {
        System.out.println("📥 Received Order Message from RabbitMQ:");
        System.out.println("Order ID: " + message.getOrderId());
        System.out.println("Doctor Email: " + message.getDoctorEmail());
        System.out.println("Drug IDs: " + message.getDrugIds());
        System.out.println("Placed At: " + message.getPlacedAt());

        // 👉 Optional: Add inventory deduction logic here in next step
    }
}
