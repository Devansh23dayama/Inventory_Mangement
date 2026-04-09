package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.dto.TransactionDTO;
import com.inventory.model.Product;
import com.inventory.model.Transaction;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.TransactionRepository;

@Service
public class TransactionService {
	@Autowired
	private TransactionRepository tr;

	@Autowired
	private ProductRepository pr;

	public Transaction recordTransaction(Transaction transaction) {
		Product product = pr.findById(transaction.getProduct().getId())
				.orElseThrow(() -> new RuntimeException("Product not found"));
		if (transaction.getType().equalsIgnoreCase("IN")) {
			product.setQuantity(product.getQuantity() + transaction.getQuantity());
		} else if (transaction.getType().equalsIgnoreCase("OUT")) {
			if (product.getQuantity() < transaction.getQuantity()) {
				throw new RuntimeException("Insufficient Stock");
			}
			product.setQuantity(product.getQuantity() - transaction.getQuantity());

		}
		pr.save(product);
		return tr.save(transaction);
	}

	public List<Transaction> getAlTransactions() {
		return tr.findAll();
	}

	public List<Transaction> getTransactionByProduct(Long id) {
		return tr.findByproductId(id);
	}

	public Transaction recordTransactionFromDTO(TransactionDTO dto) {
		Product product = pr.findById(dto.getProductId()).orElseThrow(() -> new RuntimeException("product Not Found"));
		int currentQty = product.getQuantity() != null ? product.getQuantity() : 0;
		if (dto.getType().equalsIgnoreCase("IN")) {
			product.setQuantity(currentQty + dto.getQuantity());
		} else if (dto.getType().equalsIgnoreCase("OUT")) {
			if (product.getQuantity() < dto.getQuantity()) {
				throw new RuntimeException("Insufficient Stock");
			}
			product.setQuantity(product.getQuantity() - dto.getQuantity());
		}
		pr.save(product);

		Transaction transaction = new Transaction();
		transaction.setProduct(product);
		transaction.setType(dto.getType().toUpperCase());
		transaction.setQuantity(dto.getQuantity());
		transaction.setNote(dto.getNote());
		return tr.save(transaction);

	}
}
