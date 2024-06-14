package com.springboot.backend.sergio.userapp.users_backend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

    

}
