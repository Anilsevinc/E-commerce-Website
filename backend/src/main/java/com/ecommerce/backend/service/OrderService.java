package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CreateOrderRequest;
import com.ecommerce.backend.entity.OrderItem;
import com.ecommerce.backend.entity.ShopOrder;
import com.ecommerce.backend.entity.UserAccount;
import com.ecommerce.backend.repository.AddressRepository;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
public class OrderService {

    private static final DateTimeFormatter ORDER_DATE_FORMAT =
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final CurrentUserService currentUserService;

    public OrderService(
            OrderRepository orderRepository,
            AddressRepository addressRepository,
            ProductRepository productRepository,
            CurrentUserService currentUserService
    ) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.productRepository = productRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional(readOnly = true)
    public List<ShopOrder> list() {
        List<ShopOrder> orders = orderRepository.findByUserOrderByOrderDateDesc(
                currentUserService.requireCurrentUser()
        );
        orders.forEach(order -> order.getProducts().size());
        return orders;
    }

    @Transactional
    public ShopOrder create(CreateOrderRequest request) {
        UserAccount user = currentUserService.requireCurrentUser();

        addressRepository.findByIdAndUser(request.getAddressId(), user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid address"));

        for (CreateOrderRequest.OrderProductRequest line : request.getProducts()) {
            if (line.getCount() == null || line.getCount() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid product count");
            }
            productRepository.findById(line.getProductId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Product not found: " + line.getProductId()
                    ));
        }

        ShopOrder order = new ShopOrder();
        order.setUser(user);
        order.setAddressId(request.getAddressId());
        order.setOrderDate(parseOrderDate(request.getOrderDate()));
        order.setPrice(request.getPrice());
        order.setCardNo(String.valueOf(request.getCardNo()).replaceAll("\\D", ""));
        order.setCardName(request.getCardName());
        order.setCardExpireMonth(request.getCardExpireMonth());
        order.setCardExpireYear(request.getCardExpireYear());
        // CVV is accepted for contract compatibility but not stored.

        for (CreateOrderRequest.OrderProductRequest line : request.getProducts()) {
            OrderItem item = new OrderItem();
            item.setProductId(line.getProductId());
            item.setCount(line.getCount());
            item.setDetail(line.getDetail());
            order.addItem(item);
        }

        return orderRepository.save(order);
    }

    private LocalDateTime parseOrderDate(String raw) {
        if (raw == null || raw.isBlank()) {
            return LocalDateTime.now();
        }
        try {
            String normalized = raw.length() > 19 ? raw.substring(0, 19) : raw;
            return LocalDateTime.parse(normalized, ORDER_DATE_FORMAT);
        } catch (DateTimeParseException ex) {
            try {
                return LocalDateTime.parse(raw);
            } catch (DateTimeParseException ignored) {
                return LocalDateTime.now();
            }
        }
    }
}
