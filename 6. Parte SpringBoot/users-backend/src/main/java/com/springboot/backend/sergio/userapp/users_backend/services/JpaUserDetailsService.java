package com.springboot.backend.sergio.userapp.users_backend.services;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.sergio.userapp.users_backend.entities.User;
import com.springboot.backend.sergio.userapp.users_backend.repositories.UserRepository;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Busca un usuario por su nombre de usuario en el repositorio
        Optional<User> optionalUser = repository.findByUsername(username);
    
        // Si el usuario no se encuentra, lanza una excepción UsernameNotFoundException
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException(String.format("Username %s no existe en el sistema", username));
        }
    
        // Obtiene el usuario de Optional, lanzando una excepción si el valor no está presente
        User user = optionalUser.orElseThrow();
    
        // Obtiene las autoridades (roles) del usuario y las convierte en una lista de GrantedAuthority
        java.util.List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    
        // Retorna un objeto UserDetails con la información del usuario, incluyendo su nombre de usuario, contraseña y roles
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), true, true, true, true, authorities);
    }

}
