package com.sweetshop.dtos;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SweetDTO {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private Integer quantity;
    private String description;
    private String imageUrl;
    private LocalDateTime createdAt;
    private String createdBy;
}
