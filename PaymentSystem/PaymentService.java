package com.pharma.payment.service;

import com.pharma.payment.model.Payment;

import java.util.List;

public interface PaymentService {
    Payment initiatePayment(Payment payment);
    List<Payment> getPendingPayments(String doctorEmail);
    Payment markAsPaid(Long  paymentId);
    
    
    String createRazorpayOrder(Long  paymentId);

}
