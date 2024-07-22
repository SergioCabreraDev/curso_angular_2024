package com.springboot.backend.sergio.userapp.users_backend.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.springboot.backend.sergio.userapp.users_backend.auth.filter.JwtAuthenticationFilter;
import com.springboot.backend.sergio.userapp.users_backend.auth.filter.JwtValidationFilter;

    @Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    // Define un bean para el AuthenticationManager, que se usa para la autenticación
    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Define un bean para el PasswordEncoder, que se usa para codificar contraseñas
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Define el filtro de seguridad de Spring
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.authorizeHttpRequests(authz -> authz
                // Permite el acceso público a ciertas rutas GET
                .requestMatchers(HttpMethod.GET, "/api/users", "/api/users/page/{page}").permitAll()
                // Requiere que el usuario tenga rol USER o ADMIN para acceder a ciertas rutas GET
                .requestMatchers(HttpMethod.GET, "/api/users/{id}").hasAnyRole("USER", "ADMIN")
                // Requiere que el usuario tenga rol ADMIN para acceder a ciertas rutas POST, PUT y DELETE
                .requestMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/users/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/users/{id}").hasRole("ADMIN")
                // Requiere autenticación para cualquier otra solicitud
                .anyRequest().authenticated())
                // Configura CORS utilizando el método configurationSource
                .cors(cors -> cors.configurationSource(configurationSource()))
                // Añade filtros para la autenticación y validación JWT
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilter(new JwtValidationFilter(authenticationManager()))
                // Desactiva la protección CSRF ya que se usa JWT
                .csrf(config -> config.disable())
                // Configura la política de sesión como stateless
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Construye el filtro de seguridad configurado
                .build();
    }

    // Define la configuración CORS
    @Bean
    CorsConfigurationSource configurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Permite orígenes usando patrones, aquí se permite cualquier origen
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        // Permite orígenes específicos (ej. localhost:4200)
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        // Permite ciertos métodos HTTP
        config.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE"));
        // Permite ciertos headers
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        // Permite credenciales
        config.setAllowCredentials(true);

        // Crea una fuente basada en URLs y registra la configuración para todas las rutas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Define un filtro de registro para CORS con alta precedencia
    @Bean
    FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> corsBean = new FilterRegistrationBean<CorsFilter>(
                new CorsFilter(this.configurationSource()));
        corsBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return corsBean;
    }
}
