package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.ShopOrder;
import com.ecommerce.backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<ShopOrder, Long> {

    List<ShopOrder> findByUserOrderByOrderDateDesc(UserAccount user);
}
