package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductListResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductListResponse list(Integer limit, Integer offset, Long categoryId, String sort, String filter) {
        int safeLimit = (limit == null || limit <= 0) ? 25 : limit;
        int safeOffset = (offset == null || offset < 0) ? 0 : offset;
        int page = safeOffset / safeLimit;

        String normalizedFilter = (filter == null || filter.isBlank()) ? null : filter.trim();
        Pageable pageable = PageRequest.of(page, safeLimit, resolveSort(sort));

        Page<Product> result = productRepository.search(categoryId, normalizedFilter, pageable);
        return new ProductListResponse(result.getTotalElements(), result.getContent());
    }

    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    private Sort resolveSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Direction.ASC, "id");
        }

        return switch (sort.trim()) {
            case "price:asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price:desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "rating:asc" -> Sort.by(Sort.Direction.ASC, "rating");
            case "rating:desc" -> Sort.by(Sort.Direction.DESC, "rating");
            default -> Sort.by(Sort.Direction.ASC, "id");
        };
    }
}
