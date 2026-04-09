package com.inventory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.dto.ProductDTO;
import com.inventory.model.Product;
import com.inventory.model.Supplier;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.SupplierRepository;
import com.inventory.repository.TransactionRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository pr;

	@Autowired
	private SupplierRepository sr;
	@Autowired
	private TransactionRepository tr;

	public Product addProduct(Product product) {
		return pr.save(product);
	}

	public List<Product> getAllProducts() {
		return pr.findAll();
	}

	public Product getProductById(Long id) {
		System.out.println("1");
		return pr.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		
	}
	
	public Product updateProduct(Long id, Product updatedproduct) {
		System.out.println("2");
		Product existing = getProductById(id);
		existing.setName(updatedproduct.getName());
		existing.setCategory(updatedproduct.getCategory());
		existing.setQuantity(updatedproduct.getQuantity());
		existing.setPrice(updatedproduct.getPrice());
		existing.setLowStockThreshold(updatedproduct.getLowStockThreshold());
		existing.setSupplier(updatedproduct.getSupplier());
		return pr.save(existing);
	}
     
	public void deleteProduct(Long id) {
		System.out.println("3");
      tr.deleteAll(tr.findByproductId(id));
      pr.deleteById(id);
	}

	public List<Product> getLowStockProducts() {
		System.out.println("4");
		return pr.findLowStockProducts();
	}

	public Product addproductFromDTO(ProductDTO dto) {
		System.out.println("5");
		Product product = new Product();
		product.setName(dto.getName());
		product.setCategory(dto.getCategory());
		product.setQuantity(dto.getQuantity());
		product.setPrice(dto.getPrice());
		product.setLowStockThreshold(dto.getLowStockThreshold() != null ? dto.getLowStockThreshold() : 10);
		if (dto.getSupplierId() != null) {
			Supplier supplier = sr.findById(dto.getSupplierId())
					.orElseThrow(() -> new RuntimeException("Supplier Not Found with id" + dto.getSupplierId()));
			product.setSupplier(supplier);
		}
		return pr.save(product);

	}
}
