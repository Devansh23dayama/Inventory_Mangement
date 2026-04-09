package com.inventory.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
List<Transaction> findByproductId(Long productId);
}
