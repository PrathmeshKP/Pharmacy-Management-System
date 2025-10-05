package com.pharma.payment.repository;

import com.pharma.payment.model.Payment;
import com.pharma.payment.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByDoctorEmailAndPaidFalse(String doctorEmail);
}
