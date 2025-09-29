package com.pharma.salesreport.controller;
import com.pharma.salesreport.model.SalesReport; import com.pharma.salesreport.service.SalesReportService; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.pharma.salesreport.model.SalesReport; import com.pharma.salesreport.service.SalesReportService; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController @RequestMapping("/api/sales")
public class SalesReportController {
	@Autowired
	private SalesReportService reportService;

	@GetMapping
	public List<SalesReport> getAllReports() {
	    return reportService.getAllReports();
	}
	
	@GetMapping("/test-exception") public String testException() {
		throw new RuntimeException("This is a test exception from SalesReport microservice.");
	}

	@PostMapping
	public SalesReport addReport(@RequestBody SalesReport report) {
	    return reportService.addReport(report);
	}


	
	
}