package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.AddressRequest;
import com.ecommerce.backend.entity.Address;
import com.ecommerce.backend.entity.UserAccount;
import com.ecommerce.backend.repository.AddressRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final CurrentUserService currentUserService;

    public AddressService(AddressRepository addressRepository, CurrentUserService currentUserService) {
        this.addressRepository = addressRepository;
        this.currentUserService = currentUserService;
    }

    @Transactional(readOnly = true)
    public List<Address> list() {
        return addressRepository.findByUserOrderByIdAsc(currentUserService.requireCurrentUser());
    }

    @Transactional
    public Address create(AddressRequest request) {
        UserAccount user = currentUserService.requireCurrentUser();
        Address address = new Address();
        address.setUser(user);
        apply(address, request);
        return addressRepository.save(address);
    }

    @Transactional
    public Address update(AddressRequest request) {
        if (request.getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Address id is required");
        }
        UserAccount user = currentUserService.requireCurrentUser();
        Address address = addressRepository.findByIdAndUser(request.getId(), user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
        apply(address, request);
        return addressRepository.save(address);
    }

    @Transactional
    public void delete(Long id) {
        UserAccount user = currentUserService.requireCurrentUser();
        Address address = addressRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Address not found"));
        addressRepository.delete(address);
    }

    private void apply(Address address, AddressRequest request) {
        address.setTitle(request.getTitle());
        address.setName(request.getName());
        address.setSurname(request.getSurname());
        address.setPhone(request.getPhone());
        address.setCity(request.getCity());
        address.setDistrict(request.getDistrict());
        address.setNeighborhood(request.getNeighborhood());
        address.setAddress(request.getAddress());
    }
}
