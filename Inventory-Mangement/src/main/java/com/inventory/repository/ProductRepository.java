package com.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.inventory.model.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
List<Product> findByLowStockThreshold(Integer lowStockThreshold);

@Query("SELECT p FROM Product p WHERE p.quantity <p.lowStockThreshold")
List<Product> findLowStockProducts();
List<Product> findBySupplierId(Long supplierId);
}
