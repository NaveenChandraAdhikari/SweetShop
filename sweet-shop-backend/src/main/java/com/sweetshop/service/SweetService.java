package com.sweetshop.service;

import com.sweetshop.dtos.SweetDTO;
import com.sweetshop.dtos.SweetRequest;
import com.sweetshop.models.Sweet;
import com.sweetshop.models.User;
import com.sweetshop.repository.SweetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SweetService {

    private SweetRepository sweetRepository;

    public SweetDTO createSweet(SweetRequest request, User user) {
        Sweet sweet = new Sweet();
        sweet.setName(request.getName());
        sweet.setCategory(request.getCategory());
        sweet.setPrice(request.getPrice());
        sweet.setQuantity(request.getQuantity());
        sweet.setDescription(request.getDescription());
        sweet.setImageUrl(request.getImageUrl());
        sweet.setUser(user);
        
        Sweet savedSweet = sweetRepository.save(sweet);
        return convertToDto(savedSweet);
    }

    public List<SweetDTO> getAllSweets() {
        return sweetRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SweetDTO getSweetById(Long id) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        return convertToDto(sweet);
    }

    public List<SweetDTO> searchSweets(String name, String category, Double minPrice, Double maxPrice) {
        return sweetRepository.searchSweets(name, category, minPrice, maxPrice).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SweetDTO updateSweet(Long id, SweetRequest request) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        if (request.getName() != null) {
            sweet.setName(request.getName());
        }
        if (request.getCategory() != null) {
            sweet.setCategory(request.getCategory());
        }
        if (request.getPrice() != null) {
            sweet.setPrice(request.getPrice());
        }
        if (request.getQuantity() != null) {
            sweet.setQuantity(request.getQuantity());
        }
        if (request.getDescription() != null) {
            sweet.setDescription(request.getDescription());
        }
        if (request.getImageUrl() != null) {
            sweet.setImageUrl(request.getImageUrl());
        }
        
        Sweet updatedSweet = sweetRepository.save(sweet);
        return convertToDto(updatedSweet);
    }

    public void deleteSweet(Long id) {
        if (!sweetRepository.existsById(id)) {
            throw new RuntimeException("Sweet not found with id: " + id);
        }
        sweetRepository.deleteById(id);
    }

    public SweetDTO purchaseSweet(Long id, Integer quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient quantity. Available: " + sweet.getQuantity());
        }
        
        sweet.setQuantity(sweet.getQuantity() - quantity);
        Sweet updatedSweet = sweetRepository.save(sweet);
        return convertToDto(updatedSweet);
    }

    public SweetDTO restockSweet(Long id, Integer quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        sweet.setQuantity(sweet.getQuantity() + quantity);
        Sweet updatedSweet = sweetRepository.save(sweet);
        return convertToDto(updatedSweet);
    }

    private SweetDTO convertToDto(Sweet sweet) {
        SweetDTO dto = new SweetDTO();
        dto.setId(sweet.getId());
        dto.setName(sweet.getName());
        dto.setCategory(sweet.getCategory());
        dto.setPrice(sweet.getPrice());
        dto.setQuantity(sweet.getQuantity());
        dto.setDescription(sweet.getDescription());
        dto.setImageUrl(sweet.getImageUrl());
        dto.setCreatedAt(sweet.getCreatedAt());
        if (sweet.getUser() != null) {
            dto.setCreatedBy(sweet.getUser().getUsername());
        }
        return dto;
    }
}
