package com.pharma.supplierinventory.repository;

import com.pharma.supplierinventory.model.Supplier;
import com.pharma.supplierinventory.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    // Custom query methods can go here (optional)
}
