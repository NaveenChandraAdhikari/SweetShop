package com.sweetshop.controller;

import com.sweetshop.dtos.PurchaseRequest;
import com.sweetshop.dtos.SweetDTO;
import com.sweetshop.dtos.SweetRequest;
import com.sweetshop.models.User;
import com.sweetshop.service.SweetService;
import com.sweetshop.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sweets")
@AllArgsConstructor
public class SweetsController {

    private SweetService sweetService;
    private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SweetDTO> createSweet(@RequestBody SweetRequest request, Principal principal) {
        User user = userService.findByUsername(principal.getName());
        SweetDTO sweet = sweetService.createSweet(request, user);
        return ResponseEntity.ok(sweet);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<SweetDTO>> getAllSweets() {
        List<SweetDTO> sweets = sweetService.getAllSweets();
        return ResponseEntity.ok(sweets);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SweetDTO> getSweetById(@PathVariable Long id) {
        SweetDTO sweet = sweetService.getSweetById(id);
        return ResponseEntity.ok(sweet);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<SweetDTO>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        List<SweetDTO> sweets = sweetService.searchSweets(name, category, minPrice, maxPrice);
        return ResponseEntity.ok(sweets);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SweetDTO> updateSweet(@PathVariable Long id, @RequestBody SweetRequest request) {
        SweetDTO sweet = sweetService.updateSweet(id, request);
        return ResponseEntity.ok(sweet);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok(Map.of("message", "Sweet deleted successfully"));
    }

    @PostMapping("/{id}/purchase")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<SweetDTO> purchaseSweet(@PathVariable Long id, @RequestBody(required = false) PurchaseRequest request) {
        int quantity = (request != null && request.getQuantity() != null) ? request.getQuantity() : 1;
        SweetDTO sweet = sweetService.purchaseSweet(id, quantity);
        return ResponseEntity.ok(sweet);
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SweetDTO> restockSweet(@PathVariable Long id, @RequestBody PurchaseRequest request) {
        SweetDTO sweet = sweetService.restockSweet(id, request.getQuantity());
        return ResponseEntity.ok(sweet);
    }
}
