package com.pharma.payment.controller;

import com.pharma.payment.model.Payment;
import com.pharma.payment.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import com.pharma.payment.service.PaymentService;
import com.pharma.payment.model.Payment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    
    @PostMapping("/initiate")
    public Payment initiate(@RequestBody Payment payment) {
        return paymentService.initiatePayment(payment);
    }

   
    @GetMapping("/pending")
    public List<Payment> getPending(@RequestParam String doctorEmail) {
        return paymentService.getPendingPayments(doctorEmail);
    }
    
    @PutMapping("/complete/{id}")
    public ResponseEntity<?> markPaymentAsCompleted(@PathVariable Long  id) {
        try {
            Payment payment = paymentService.markAsPaid(id);
            return ResponseEntity.ok(Map.of(
                "message", "Payment marked as completed.",
                "paymentId", payment.getId()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(Map.of("message", e.getMessage()));
        }
    }


   
    
    
    @PostMapping("/create-order/{paymentId}")
    public String createRazorpayOrder(@PathVariable Long  paymentId) {
        return paymentService.createRazorpayOrder(paymentId);
    }

}
