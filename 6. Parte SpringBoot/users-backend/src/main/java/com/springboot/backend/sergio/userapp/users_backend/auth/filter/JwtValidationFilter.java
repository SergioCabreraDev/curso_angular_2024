package com.springboot.backend.sergio.userapp.users_backend.auth.filter;

import static com.springboot.backend.sergio.userapp.users_backend.auth.TokenJwtConfig.CONTENT_TYPE;
import static com.springboot.backend.sergio.userapp.users_backend.auth.TokenJwtConfig.HEADER_AUTHORIZATION;
import static com.springboot.backend.sergio.userapp.users_backend.auth.TokenJwtConfig.PREFIX_TOKEN;
import static com.springboot.backend.sergio.userapp.users_backend.auth.TokenJwtConfig.SECRET_KEY;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.backend.sergio.userapp.users_backend.auth.SimpleGrantedAuthorityJsonCreator;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Arrays;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Clase que extiende BasicAuthenticationFilter para validar el JWT
public class JwtValidationFilter extends BasicAuthenticationFilter {

    // Constructor que recibe un AuthenticationManager y se lo pasa a la clase base
    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    // Método que se llama para realizar el filtrado de cada solicitud HTTP
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Obtener el valor del encabezado de autorización de la solicitud HTTP
        String header = request.getHeader(HEADER_AUTHORIZATION);

        // Si el encabezado es nulo o no empieza con el prefijo BEARER, continuamos la cadena de filtros
        if (header == null && !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }

        // Eliminar el prefijo del token para obtener solo el token JWT
        String token = header.replace(PREFIX_TOKEN, "");

        try {
            // Analizar el token JWT utilizando la clave secreta y obtener los claims (reclamaciones)
            Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload();
            
             // Obtener otro campo específico del token, en este caso "username"
             String username = (String) claims.get("username");
            
             // Obtener los authorities (roles/autoridades) del token
             Object authoritiesClaims = claims.get("authorities");
 
             // Convertir los authorities del token a una colección de GrantedAuthority
             Collection<? extends GrantedAuthority> roles = Arrays.asList(
                     new ObjectMapper()
                     .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                     .readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class)
             );
 
             // Crear un token de autenticación utilizando el nombre de usuario y roles
             UsernamePasswordAuthenticationToken authenticationToken = 
                     new UsernamePasswordAuthenticationToken(username, null, roles);
 
             // Establecer el token de autenticación en el contexto de seguridad
             SecurityContextHolder.getContext().setAuthentication(authenticationToken);
             chain.doFilter(request, response);
 
         } catch (JwtException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", e.getMessage());
            body.put("message", "El token es invalido!");

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(401);
            response.setContentType(CONTENT_TYPE);
        }

     }
 }