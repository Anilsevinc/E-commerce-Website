package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.AuthResponse;
import com.ecommerce.backend.dto.LoginRequest;
import com.ecommerce.backend.dto.SignupRequest;
import com.ecommerce.backend.entity.Role;
import com.ecommerce.backend.entity.Store;
import com.ecommerce.backend.entity.UserAccount;
import com.ecommerce.backend.repository.RoleRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StoreRepository storeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            StoreRepository storeRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.storeRepository = storeRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public void signup(SignupRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already registered");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role"));

        boolean isStore = "store".equalsIgnoreCase(role.getCode());
        if (isStore && request.getStore() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Store details are required");
        }

        UserAccount user = new UserAccount();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        // School project: skip email activation and allow immediate login.
        user.setActive(true);
        userRepository.save(user);

        if (isStore) {
            Store store = new Store();
            store.setUser(user);
            store.setName(request.getStore().getName());
            store.setPhone(request.getStore().getPhone());
            store.setTaxNo(request.getStore().getTaxNo());
            store.setBankAccount(request.getStore().getBankAccount());
            storeRepository.save(store);
        }
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        UserAccount user = userRepository.findByEmailIgnoreCase(request.getEmail().trim())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!user.isActive() || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());
        return toAuthResponse(user, token);
    }

    @Transactional(readOnly = true)
    public AuthResponse verify(String email) {
        UserAccount user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        String token = jwtService.generateToken(user.getEmail());
        return toAuthResponse(user, token);
    }

    private AuthResponse toAuthResponse(UserAccount user, String token) {
        return new AuthResponse(
                user.getName(),
                user.getEmail(),
                user.getRole().getId(),
                token
        );
    }
}
