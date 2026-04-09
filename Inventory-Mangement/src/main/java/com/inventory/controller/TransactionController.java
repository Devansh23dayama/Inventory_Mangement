package com.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.dto.TransactionDTO;
import com.inventory.model.Transaction;
import com.inventory.service.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	@Autowired
	private TransactionService ts;

	@PostMapping
	public ResponseEntity<Transaction> recordTransaction(@RequestBody TransactionDTO transactionDTO) {
		return ResponseEntity.ok(ts.recordTransactionFromDTO(transactionDTO));
	}

	@GetMapping
	public ResponseEntity<List<Transaction>> getAllTransactions() {
		return ResponseEntity.ok(ts.getAlTransactions());
	}

	@GetMapping("/product/{productId}")
	public ResponseEntity<List<Transaction>> getByProduct(@PathVariable Long productId) {
		return ResponseEntity.ok(ts.getTransactionByProduct(productId));
	}

}
