package com.pharma.users;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableFeignClients
@SpringBootApplication
@EnableDiscoveryClient
public class UsersMicroserviceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UsersMicroserviceApplication.class, args);
    }
}
