package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.model.Supplier;
import com.inventory.service.SupplierService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/suppliers")
public class SupplierController {
	@Autowired
	private SupplierService ss;

	@PostMapping
	public ResponseEntity<Supplier> addSupplier(@RequestBody Supplier supplier) {
		return ResponseEntity.ok(ss.addSupplier(supplier));

	}

	@GetMapping
	public ResponseEntity<List<Supplier>> getAllSuppliers() {
		return ResponseEntity.ok(ss.getAllSuppliers());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
		return ResponseEntity.ok(ss.getSupplierById(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
		ss.deleteSupplier(id);
		return ResponseEntity.ok("Supplier Deleted Succesfully");
	}
}
