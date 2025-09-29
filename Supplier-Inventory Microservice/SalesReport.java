package com.pharma.salesreport.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sales_report")
public class SalesReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "drug_name", nullable = false)
    private String drugName;

    @Column(name = "quantity_sold")
    private int quantitySold;

    @Column(name = "total_revenue")
    private double totalRevenue;

    @Column(name = "date")
    private LocalDate date;

    public SalesReport() {}

    public SalesReport(String drugName, int quantitySold, double totalRevenue, LocalDate date) {
        this.drugName = drugName;
        this.quantitySold = quantitySold;
        this.totalRevenue = totalRevenue;
        this.date = date;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDrugName() { return drugName; }
    public void setDrugName(String drugName) { this.drugName = drugName; }

    public int getQuantitySold() { return quantitySold; }
    public void setQuantitySold(int quantitySold) { this.quantitySold = quantitySold; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
