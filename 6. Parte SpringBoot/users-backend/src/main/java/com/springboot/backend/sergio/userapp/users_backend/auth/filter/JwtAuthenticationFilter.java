package com.springboot.backend.sergio.userapp.users_backend.auth.filter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.backend.sergio.userapp.users_backend.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import static com.springboot.backend.sergio.userapp.users_backend.auth.TokenJwtConfig.*;

// Clase JwtAuthenticationFilter que extiende UsernamePasswordAuthenticationFilter para manejar la autenticación basada en JWT
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // Objeto para gestionar la autenticación
    private AuthenticationManager authenticationManager;

    // Constructor que recibe un AuthenticationManager y lo asigna al atributo correspondiente
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // Método para intentar la autenticación
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        
        // Variables para almacenar el nombre de usuario y la contraseña
        String username = null;
        String password = null;
        
        // Variable para almacenar el usuario
        User user = null;

        try {
            // Leer el usuario desde el flujo de entrada de la solicitud HTTP
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            username = user.getUsername();
            password = user.getPassword();

        } catch (StreamReadException e) {
            // Manejar la excepción en caso de error de lectura del flujo
            e.printStackTrace();
        } catch (DatabindException e) {
            // Manejar la excepción en caso de error de enlace de datos
            e.printStackTrace();
        } catch (IOException e) {
            // Manejar la excepción en caso de error de entrada/salida
            e.printStackTrace();
        }

        // Crear un token de autenticación con el nombre de usuario y la contraseña
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        
        // Autenticar el token utilizando el AuthenticationManager
        return this.authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        
            org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User)authResult.getPrincipal();
            String username = user.getUsername();

            Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();

            Claims claims = Jwts.claims()
            .add("authorities", new ObjectMapper().writeValueAsString(roles))
            .add("username", username).build();
 
            String jwt = Jwts.builder()
                    .subject(username)
                    .claims(claims)
                    .signWith(SECRET_KEY)
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + 3600000))
                .compact();

            response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN + jwt);

            Map<String, String> body = new HashMap<>();
            body.put("token", jwt);
            body.put("username", username);
            body.put("messsage", String.format("HAS %s INICIADO SESION CON EXITO", username));

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setContentType(CONTENT_TYPE);

            response.setStatus(200);

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        // TODO Auto-generated method stub
        super.unsuccessfulAuthentication(request, response, failed);
    }
}

