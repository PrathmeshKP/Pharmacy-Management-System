package com.pharma.orders.model;

import jakarta.persistence.*;
import java.util.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String doctorName;
    private String drugName;
    private int quantity;
    private String doctorEmail;
    
    
    @ElementCollection
    @CollectionTable(name = "order_drug_ids", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "drug_id")
    private List<String> drugIds;
    
    private LocalDateTime placedAt;

    private boolean verified;
    private boolean pickedUp;

    public Order() {
    }

    public Order(String doctorName, String drugName, int quantity) {
        this.doctorName = doctorName;
        this.drugName = drugName;
        this.quantity = quantity;
        this.verified = false;
        this.pickedUp = false;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public boolean isPickedUp() {
        return pickedUp;
    }

    public void setPickedUp(boolean pickedUp) {
        this.pickedUp = pickedUp;
    }
    
    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }
    public List<String> getDrugIds() {
        return drugIds;
    }

    public void setDrugIds(List<String> drugIds) {
        this.drugIds = drugIds;
    }

    public LocalDateTime getPlacedAt() {
        return placedAt;
    }

    public void setPlacedAt(LocalDateTime placedAt) {
        this.placedAt = placedAt;
    }
}
