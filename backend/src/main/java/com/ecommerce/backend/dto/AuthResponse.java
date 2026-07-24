package com.ecommerce.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthResponse {

    private String name;
    private String email;

    @JsonProperty("role_id")
    private Long roleId;

    private String token;

    public AuthResponse() {
    }

    public AuthResponse(String name, String email, Long roleId, String token) {
        this.name = name;
        this.email = email;
        this.roleId = roleId;
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
