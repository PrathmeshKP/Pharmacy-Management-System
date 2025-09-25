package com.pharma.medicine.service;

import com.pharma.medicine.model.Medicine;
import com.pharma.medicine.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import com.pharma.medicine.logging.LoggerUtil;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    private static final Logger logger = LoggerUtil.getLogger(MedicineService.class);

    public Medicine addMedicine(Medicine medicine) {
        logger.info("Adding medicine ");
        return medicineRepository.save(medicine);
    }

    public List<Medicine> getAllMedicines() {
        logger.info("Getting all medicines ");
        return medicineRepository.findAll();
    }

    public List<Medicine> searchByName(String name) {
        logger.info("Searching medicines by name: {}", name);
        return medicineRepository.findByNameContainingIgnoreCase(name);
    }

    public void deleteMedicine(Long id) {
        logger.info("Deleting medicine with ID: {}", id);
        medicineRepository.deleteById(id);
    }

    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with ID: " + id));

        medicine.setName(updatedMedicine.getName());
        medicine.setManufacturer(updatedMedicine.getManufacturer());
        medicine.setPrice(updatedMedicine.getPrice());
        medicine.setQuantity(updatedMedicine.getQuantity());

        logger.info("Updating medicine with ID: {}", id);
        return medicineRepository.save(medicine);
    }
    
    public void reduceStockByName(String name, int quantity) {
        List<Medicine> medicines = medicineRepository.findByNameContainingIgnoreCase(name);

        if (medicines.isEmpty()) {
            throw new RuntimeException("Medicine not found with name: " + name);
        }

        // assuming exact match or first match
        Medicine medicine = medicines.get(0);

        if (medicine.getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock for medicine: " + name);
        }

        medicine.setQuantity(medicine.getQuantity() - quantity);
        medicineRepository.save(medicine);

        logger.info("Reduced stock for medicine: {} by {}", name, quantity);
    }
    
    public Medicine findByExactName(String name) {
        return medicineRepository.findByNameContainingIgnoreCase(name)
                .stream().findFirst().orElse(null);
    }

}
