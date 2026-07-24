package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CardRequest;
import com.ecommerce.backend.entity.CreditCard;
import com.ecommerce.backend.service.CardService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/card")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping
    public List<CreditCard> list() {
        return cardService.list();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreditCard create(@Valid @RequestBody CardRequest request) {
        return cardService.create(request);
    }

    @PutMapping
    public CreditCard update(@Valid @RequestBody CardRequest request) {
        return cardService.update(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        cardService.delete(id);
    }
}
