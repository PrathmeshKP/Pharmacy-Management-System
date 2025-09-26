package com.pharma.orders.feign;

import com.pharma.orders.dto.MedicineDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "medicine-service", path = "/api/medicines")
public interface MedicineFeignClient {

    @PutMapping("/reduce-stock")
    void reduceStock(@RequestParam("name") String medicineName, @RequestParam("quantity") int quantity);

    // Use the endpoint that returns a single medicine by exact name
    @GetMapping("/get-by-name")
    MedicineDTO getMedicineByName(@RequestParam("name") String name);
}
