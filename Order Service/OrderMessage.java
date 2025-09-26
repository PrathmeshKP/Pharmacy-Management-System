package com.pharma.orders.dto;

import java.util.*;
public class OrderMessage {
    private Long orderId;
    private String doctorEmail;
    private List<String> drugIds;
    private Date placedAt;
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
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
	public Date getPlacedAt() {
		return placedAt;
	}
	public void setPlacedAt(Date placedAt) {
		this.placedAt = placedAt;
	}
    
    
    
    
    
}
