package com.pharma.supplierinventory.service;

import com.pharma.supplierinventory.model.Supplier;
import com.pharma.supplierinventory.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import com.pharma.supplierinventory.util.LoggerUtil;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;
    
    private static final Logger logger = LoggerUtil.getLogger(SupplierService.class);

    public Supplier addSupplier(Supplier supplier) {
    	logger.info("adding suppliers ");
        return supplierRepository.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
    	logger.info("Fetching all suppliers from the database...");
        return supplierRepository.findAll();
    }

    public Optional<Supplier> getSupplierById(Long id) {
    	logger.info("getting supplier bi Id.");
        return supplierRepository.findById(id);
    }

    public Supplier updateSupplier(Long id, Supplier updatedSupplier) {
    	logger.info("updating supplier");
        updatedSupplier.setId(id);
        return supplierRepository.save(updatedSupplier);
    }

    public void deleteSupplier(Long id) {
    	logger.info("deleting supplier");
        supplierRepository.deleteById(id);
    }
}
