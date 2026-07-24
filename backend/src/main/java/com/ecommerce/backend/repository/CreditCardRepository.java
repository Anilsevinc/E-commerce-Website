package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.CreditCard;
import com.ecommerce.backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {

    List<CreditCard> findByUserOrderByIdAsc(UserAccount user);

    Optional<CreditCard> findByIdAndUser(Long id, UserAccount user);
}
