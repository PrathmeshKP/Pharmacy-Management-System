package com.pharma.orders.messaging;

import com.pharma.orders.config.RabbitMQConfig;
import com.pharma.orders.dto.OrderMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderMessageProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendOrderMessage(OrderMessage message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE, message);
    }
}
