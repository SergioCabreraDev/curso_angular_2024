package com.springboot.backend.sergio.userapp.users_backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.springboot.backend.sergio.userapp.users_backend.auth.filter.JwtAuthenticationFilter;

// Marca esta clase como una clase de configuración para Spring
@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration autenticacionConfiguration;


    @Bean
    AuthenticationManager authenticationManager() throws Exception{
        return autenticacionConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // Define un bean de tipo SecurityFilterChain, que es la cadena de filtros de seguridad de Spring Security
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            // Configura la autorización de solicitudes HTTP
            .authorizeHttpRequests(authz ->
                authz
                    // Permite todas las solicitudes GET a "/api/users" y "/api/users/page/{page}"
                    .requestMatchers(HttpMethod.GET, "/api/users", "/api/users/page/{page}").permitAll()
                    .requestMatchers(HttpMethod.GET, "api/users/{id}").hasAnyRole("ADMIN", "USER")
                    .requestMatchers(HttpMethod.POST, "api/users").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.PUT, "api/users/{id}").hasRole("ADMIN")
                    .requestMatchers(HttpMethod.DELETE, "api/users/{id}").hasRole("ADMIN")
                    // Requiere autenticación para cualquier otra solicitud
                    .anyRequest().authenticated()
            )
            .addFilter(new JwtAuthenticationFilter(authenticationManager()))
            // Desactiva la protección CSRF (Cross-Site Request Forgery)
            .csrf(config -> config.disable())
            // Configura la gestión de sesiones para que no se cree ninguna sesión (stateless)
            .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Construye y retorna la cadena de filtros de seguridad
            .build();
    }
}
