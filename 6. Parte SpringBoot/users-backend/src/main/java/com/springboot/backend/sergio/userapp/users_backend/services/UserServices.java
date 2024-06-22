package com.springboot.backend.sergio.userapp.users_backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;

public interface UserServices {

    List<User> findAll();

    Page<User> findAll(Pageable pageable);

    Optional<User> findById(Long id);

    User save(User user);

    void deleteById(Long id);
}
