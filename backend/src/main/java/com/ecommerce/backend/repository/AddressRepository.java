package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Address;
import com.ecommerce.backend.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUserOrderByIdAsc(UserAccount user);

    Optional<Address> findByIdAndUser(Long id, UserAccount user);
}
