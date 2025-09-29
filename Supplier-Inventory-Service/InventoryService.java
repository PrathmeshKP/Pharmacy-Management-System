package com.pharma.supplierinventory.service;

import com.pharma.supplierinventory.model.Inventory;
import com.pharma.supplierinventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public Inventory addInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(Long id) {
        return inventoryRepository.findById(id);
    }

    public Inventory updateInventory(Long id, Inventory updatedInventory) {
        updatedInventory.setId(id);
        return inventoryRepository.save(updatedInventory);
    }

    public void deleteInventory(Long id) {
        inventoryRepository.deleteById(id);
    }

}
