package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductListResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public ProductListResponse list(Integer limit, Integer offset, Long categoryId, String sort, String filter) {
        int safeLimit = (limit == null || limit <= 0) ? 25 : limit;
        int safeOffset = (offset == null || offset < 0) ? 0 : offset;
        int page = safeOffset / safeLimit;

        String normalizedFilter = (filter == null || filter.isBlank()) ? null : filter.trim();
        Pageable pageable = PageRequest.of(page, safeLimit, resolveSort(sort));

        Page<Product> result = productRepository.findAll(buildSpec(categoryId, normalizedFilter), pageable);
        // Touch lazy images inside the transaction so JSON serialization works.
        result.getContent().forEach(product -> product.getImages().size());

        return new ProductListResponse(result.getTotalElements(), result.getContent());
    }

    @Transactional(readOnly = true)
    public Product getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        product.getImages().size();
        return product;
    }

    private Specification<Product> buildSpec(Long categoryId, String filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (categoryId != null) {
                predicates.add(cb.equal(root.get("categoryId"), categoryId));
            }

            if (filter != null) {
                String pattern = "%" + filter.toLowerCase() + "%";
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), pattern),
                        cb.like(cb.lower(root.get("description")), pattern)
                ));
            }

            return cb.and(predicates.toArray(Predicate[]::new));
        };
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
