package com.ecommerce.backend.dto;

import com.ecommerce.backend.entity.Product;

import java.util.List;

public class ProductListResponse {

    private long total;
    private List<Product> products;

    public ProductListResponse() {
    }

    public ProductListResponse(long total, List<Product> products) {
        this.total = total;
        this.products = products;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
