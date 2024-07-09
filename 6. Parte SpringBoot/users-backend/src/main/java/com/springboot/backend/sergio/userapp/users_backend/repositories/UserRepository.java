package com.springboot.backend.sergio.userapp.users_backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    // Método para recuperar todos los usuarios de manera paginada
    Page<User> findAll(Pageable pageable);

    Optional<User> findByUsername(String username);

}
