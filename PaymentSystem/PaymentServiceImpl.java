package com.pharma.payment.service;

import com.pharma.payment.model.Payment;
import com.pharma.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Payment initiatePayment(Payment payment) {
        payment.setCreatedAt(LocalDateTime.now());
        payment.setPaid(false);
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getPendingPayments(String doctorEmail) {
        return paymentRepository.findByDoctorEmailAndPaidFalse(doctorEmail);
    }

    @Override
    public Payment markAsPaid(Long  paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setPaid(true);
        payment.setPaidAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }
    
    
    public String createRazorpayOrder(Long  paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        try {
            RazorpayClient client = new RazorpayClient("rzp_test_xiGcrRYtN6bFKT", "GrXxjNLaksPRBQWegvfWqPXS");

            JSONObject options = new JSONObject();
            options.put("amount", payment.getAmount() * 100);
            options.put("currency", "INR");
            options.put("receipt", "receipt_" + paymentId);
            options.put("payment_capture", 1);

            Order order = client.orders.create(options);
            return order.toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Razorpay order", e);
        }
    }

    
    
    
    
}


