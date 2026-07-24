package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CardRequest;
import com.ecommerce.backend.entity.CreditCard;
import com.ecommerce.backend.entity.UserAccount;
import com.ecommerce.backend.repository.CreditCardRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CardService {

    private final CreditCardRepository creditCardRepository;
    private final CurrentUserService currentUserService;

    public CardService(CreditCardRepository creditCardRepository, CurrentUserService currentUserService) {
        this.creditCardRepository = creditCardRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional(readOnly = true)
    public List<CreditCard> list() {
        return creditCardRepository.findByUserOrderByIdAsc(currentUserService.requireCurrentUser());
    }

    @Transactional
    public CreditCard create(CardRequest request) {
        UserAccount user = currentUserService.requireCurrentUser();
        CreditCard card = new CreditCard();
        card.setUser(user);
        apply(card, request);
        return creditCardRepository.save(card);
    }

    @Transactional
    public CreditCard update(CardRequest request) {
        if (request.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Card id is required");
        }
        UserAccount user = currentUserService.requireCurrentUser();
        CreditCard card = creditCardRepository.findByIdAndUser(request.getId(), user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found"));
        apply(card, request);
        return creditCardRepository.save(card);
    }

    @Transactional
    public void delete(Long id) {
        UserAccount user = currentUserService.requireCurrentUser();
        CreditCard card = creditCardRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Card not found"));
        creditCardRepository.delete(card);
    }

    private void apply(CreditCard card, CardRequest request) {
        String digits = String.valueOf(request.getCardNo()).replaceAll("\\D", "");
        if (digits.length() < 13) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid card number");
        }
        if (request.getExpireMonth() < 1 || request.getExpireMonth() > 12) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid expire month");
        }

        card.setCardNo(digits);
        card.setExpireMonth(request.getExpireMonth());
        card.setExpireYear(request.getExpireYear());
        card.setNameOnCard(request.getNameOnCard().trim());
    }
}
