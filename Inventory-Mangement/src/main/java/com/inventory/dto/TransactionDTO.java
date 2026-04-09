package com.inventory.dto;

import lombok.Data;

@Data
public class TransactionDTO {
private Long productId;
private String type; // in or out 
private Integer quantity;
private String note;
}
