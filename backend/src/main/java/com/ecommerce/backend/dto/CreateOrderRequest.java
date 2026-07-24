package com.ecommerce.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.List;

public class CreateOrderRequest {

    @NotNull
    @JsonProperty("address_id")
    private Long addressId;

    @JsonProperty("order_date")
    private String orderDate;

    @NotNull
    @JsonProperty("card_no")
    private Object cardNo;

    @JsonProperty("card_name")
    private String cardName;

    @NotNull
    @JsonProperty("card_expire_month")
    private Integer cardExpireMonth;

    @NotNull
    @JsonProperty("card_expire_year")
    private Integer cardExpireYear;

    @JsonProperty("card_ccv")
    private Object cardCcv;

    @NotNull
    private BigDecimal price;

    @NotEmpty
    @Valid
    private List<OrderProductRequest> products;

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Object getCardNo() {
        return cardNo;
    }

    public void setCardNo(Object cardNo) {
        this.cardNo = cardNo;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public Integer getCardExpireMonth() {
        return cardExpireMonth;
    }

    public void setCardExpireMonth(Integer cardExpireMonth) {
        this.cardExpireMonth = cardExpireMonth;
    }

    public Integer getCardExpireYear() {
        return cardExpireYear;
    }

    public void setCardExpireYear(Integer cardExpireYear) {
        this.cardExpireYear = cardExpireYear;
    }

    public Object getCardCcv() {
        return cardCcv;
    }

    public void setCardCcv(Object cardCcv) {
        this.cardCcv = cardCcv;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<OrderProductRequest> getProducts() {
        return products;
    }

    public void setProducts(List<OrderProductRequest> products) {
        this.products = products;
    }

    public static class OrderProductRequest {

        @NotNull
        @JsonProperty("product_id")
        private Long productId;

        @NotNull
        private Integer count;

        private String detail;

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }

        public String getDetail() {
            return detail;
        }

        public void setDetail(String detail) {
            this.detail = detail;
        }
    }
}
