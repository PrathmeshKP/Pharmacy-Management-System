package com.pharma.medicine.controller;

import com.pharma.medicine.model.Medicine;
import com.pharma.medicine.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import com.pharma.medicine.logging.LoggerUtil;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private static final Logger logger = LoggerUtil.getLogger(MedicineController.class);

    @Autowired
    private MedicineService medicineService;

    @PostMapping("/add")
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        logger.info("Adding medicine");
        return medicineService.addMedicine(medicine);
    }

    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {
        logger.info("Fetching all medicines");
        return medicineService.getAllMedicines();
    }

    @GetMapping("/search")
    public List<Medicine> searchMedicine(@RequestParam String name) {
        logger.info("Searching medicines by name");
        return medicineService.searchByName(name);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMedicine(@PathVariable Long id) {
        logger.info("Deleting medicine with ID: {}", id);
        medicineService.deleteMedicine(id);
    }

    @PutMapping("/update/{id}")
    public Medicine updateMedicine(@PathVariable Long id, @RequestBody Medicine updatedMedicine) {
        logger.info("Updating medicine with ID: {}", id);
        return medicineService.updateMedicine(id, updatedMedicine);
    }

    @GetMapping("/test-exception")
    public ResponseEntity<String> testException() {
        logger.info("Inside /test-exception endpoint");
        throw new RuntimeException("This is a test exception");
    }
    
    @PutMapping("/reduce-stock")
    public ResponseEntity<String> reduceStock(@RequestParam String name, @RequestParam int quantity) {
        logger.info("Reducing stock for medicine: {} by quantity: {}", name, quantity);
        medicineService.reduceStockByName(name, quantity);
        return ResponseEntity.ok("Stock reduced successfully for " + name);
    }
    
    @GetMapping("/get-by-name")
    public ResponseEntity<Medicine> getMedicineByName(@RequestParam String name) {
        Medicine medicine = medicineService.findByExactName(name);
        if (medicine == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(medicine);
    }


}
