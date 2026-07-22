package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ProductListResponse;
import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ProductListResponse getProducts(
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Integer offset,
            @RequestParam(required = false) Long category,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String filter
    ) {
        return productService.list(limit, offset, category, sort, filter);
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getById(id);
    }
}
