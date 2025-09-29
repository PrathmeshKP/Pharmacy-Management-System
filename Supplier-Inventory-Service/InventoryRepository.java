package com.pharma.supplierinventory.repository;

import com.pharma.supplierinventory.model.Inventory;
import com.pharma.supplierinventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    // Custom query methods can go here (optional)
}
