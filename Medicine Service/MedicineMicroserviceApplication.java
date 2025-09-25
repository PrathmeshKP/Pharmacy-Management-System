package com.pharma.medicine;

import org.springframework.boot.SpringApplication;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class MedicineMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedicineMicroserviceApplication.class, args);
    }
}
