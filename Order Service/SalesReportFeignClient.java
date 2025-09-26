package com.pharma.orders.feign;

import com.pharma.orders.dto.SalesReport;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "sales-report-microservice", path = "/api/sales")
public interface SalesReportFeignClient {

    @PostMapping
    SalesReport addSalesReport(@RequestBody SalesReport report);
}
