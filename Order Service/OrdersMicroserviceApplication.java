package com.pharma.orders;

import org.springframework.boot.SpringApplication;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableFeignClients(basePackages = "com.pharma.orders.feign")
@SpringBootApplication
@EnableDiscoveryClient
public class OrdersMicroserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrdersMicroserviceApplication.class, args);
    }
}

