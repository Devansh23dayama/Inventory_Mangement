package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.dto.ProductDTO;
import com.inventory.model.Product;
import com.inventory.service.ProductService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService pr;

	@PostMapping
	public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
		return ResponseEntity.ok(pr.addproductFromDTO(productDTO));
	}

	@GetMapping
	public ResponseEntity<List<Product>> getAllproducts() {
		return ResponseEntity.ok(pr.getAllProducts());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Product> getproductById(@PathVariable Long id) {
		return ResponseEntity.ok(pr.getProductById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product product) {
		return ResponseEntity.ok(pr.updateProduct(id, product));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteproduct(@PathVariable Long id) {
		pr.deleteProduct(id);
		return ResponseEntity.ok("product Deleted Succesfully");
	}

	@GetMapping("/low-stock")
	public ResponseEntity<List<Product>> getLowStockProducts() {
		return ResponseEntity.ok(pr.getLowStockProducts());
	}
}
