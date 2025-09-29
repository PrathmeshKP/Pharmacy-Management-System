package com.pharma.salesreport.service;
import com.pharma.salesreport.model.SalesReport; 
import com.pharma.salesreport.model.SalesReport;
import com.pharma.salesreport.repository.SalesReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.slf4j.Logger;
import com.pharma.salesreport.util.LoggerUtil;import com.pharma.salesreport.repository.SalesReportRepository; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;

import java.util.List;
import com.pharma.salesreport.model.SalesReport; import com.pharma.salesreport.repository.SalesReportRepository; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;

import java.util.List;
import com.pharma.salesreport.model.SalesReport; import com.pharma.salesreport.repository.SalesReportRepository; import org.springframework.beans.factory.annotation.Autowired; import org.springframework.stereotype.Service;

import java.util.List;
import org.slf4j.Logger; import com.pharma.salesreport.util.LoggerUtil;
@Service
public class SalesReportService {
	@Autowired
	private SalesReportRepository reportRepository;
	
	private static final Logger logger = LoggerUtil.getLogger(SalesReportService.class);

	public List<SalesReport> getAllReports() {
		logger.info("Fetching all sales reports");
		return reportRepository.findAll();
	}

	public SalesReport addReport(SalesReport report) {
		logger.info("adding reports"); 
		return reportRepository.save(report);
	}



}
