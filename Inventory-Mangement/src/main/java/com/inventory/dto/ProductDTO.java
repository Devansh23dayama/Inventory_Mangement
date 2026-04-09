package com.inventory.dto;

import lombok.Data;

@Data
public class ProductDTO {
private String name;
private String category;
private Integer quantity;
private Double price;
private Integer lowStockThreshold;
private Long supplierId;

}
