package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Role;
import com.ecommerce.backend.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class RoleSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(RoleSeeder.class);

    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {
        if (roleRepository.count() > 0) {
            return;
        }

        Role customer = new Role();
        customer.setId(1L);
        customer.setName("Customer");
        customer.setCode("customer");

        Role store = new Role();
        store.setId(2L);
        store.setName("Store");
        store.setCode("store");

        roleRepository.save(customer);
        roleRepository.save(store);
        log.info("Seeded roles: customer, store");
    }
}
