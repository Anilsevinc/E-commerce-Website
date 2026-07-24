package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CreateOrderRequest;
import com.ecommerce.backend.entity.ShopOrder;
import com.ecommerce.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<ShopOrder> list() {
        return orderService.list();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ShopOrder create(@Valid @RequestBody CreateOrderRequest request) {
        return orderService.create(request);
    }
}
