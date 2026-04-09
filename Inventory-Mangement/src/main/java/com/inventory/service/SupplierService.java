package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.model.Product;
import com.inventory.model.Supplier;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.SupplierRepository;
import com.inventory.repository.TransactionRepository;

import jakarta.transaction.Transactional;

@Service
public class SupplierService {
	@Autowired
	private SupplierRepository sr;

	@Autowired
	private ProductRepository pr;

	@Autowired
	private TransactionRepository tr;

	public Supplier addSupplier(Supplier supplier) {
		System.out.println("1");
		return sr.save(supplier);
	}

	public List<Supplier> getAllSuppliers() {
		System.out.println("2");
		return sr.findAll();
	}

	public Supplier getSupplierById(Long id) {
		System.out.println("3");
		return sr.findById(id).orElseThrow(() -> new RuntimeException("Supplier not found "));

	}

	@Transactional
	public void deleteSupplier(Long id) {
		System.out.println("4");

		List<Product> linked = pr.findBySupplierId(id);
		for (Product p : linked) {
			tr.deleteAll(tr.findByproductId(p.getId()));
			p.setSupplier(null);
		}
		pr.saveAll(linked);
		pr.flush();
		sr.deleteById(id);
	}
}
