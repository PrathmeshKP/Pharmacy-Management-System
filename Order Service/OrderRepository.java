package com.pharma.orders.repository;

import com.pharma.orders.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByVerified(boolean verified);
    List<Order> findByPickedUp(boolean pickedUp);
    List<Order> findByVerifiedFalse();
}
