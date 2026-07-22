package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
            SELECT p FROM Product p
            WHERE (:categoryId IS NULL OR p.categoryId = :categoryId)
              AND (
                   :filter IS NULL
                   OR LOWER(p.name) LIKE LOWER(CONCAT('%', :filter, '%'))
                   OR LOWER(p.description) LIKE LOWER(CONCAT('%', :filter, '%'))
              )
            """)
    Page<Product> search(
            @Param("categoryId") Long categoryId,
            @Param("filter") String filter,
            Pageable pageable
    );
}
