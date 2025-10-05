package com.pharma.payment.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // Use Long instead of String for MySQL auto-increment ID

    private Long orderId;

    @Column(nullable = false)
    private String doctorEmail;

    private double amount;

    private boolean paid;

    private LocalDateTime createdAt;

    private LocalDateTime paidAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getPaidAt() {
		return paidAt;
	}

	public void setPaidAt(LocalDateTime paidAt) {
		this.paidAt = paidAt;
	}

	public Payment(Long id, Long orderId, String doctorEmail, double amount, boolean paid, LocalDateTime createdAt,
			LocalDateTime paidAt) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.doctorEmail = doctorEmail;
		this.amount = amount;
		this.paid = paid;
		this.createdAt = createdAt;
		this.paidAt = paidAt;
	}

	public Payment() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
