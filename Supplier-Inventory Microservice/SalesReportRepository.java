package com.pharma.salesreport.repository;

import com.pharma.salesreport.model.SalesReport; import org.springframework.stereotype.Repository;

import com.pharma.salesreport.model.SalesReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository 
public interface SalesReportRepository extends JpaRepository<SalesReport, Long> { 
// Additional query methods can be defined here }
}