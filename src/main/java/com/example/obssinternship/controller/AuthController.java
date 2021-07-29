package com.example.obssinternship.controller;

import com.example.obssinternship.payload.request.LoginRequest;
import com.example.obssinternship.payload.request.ValidateTokenRequest;
import com.example.obssinternship.payload.response.ApiResponse;
import com.example.obssinternship.payload.response.JwtAuthenticationResponse;
import com.example.obssinternship.security.JwtTokenProvider;
import com.example.obssinternship.util.MessageConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @PostMapping("/signIn")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        if(loginRequest.getUsername().isEmpty() || loginRequest.getPassword().isEmpty()) {
            return new ResponseEntity(new ApiResponse(false, MessageConstants.USERNAME_OR_PASSWORD_INVALID),
                    HttpStatus.BAD_REQUEST);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        String jwt = tokenProvider.generateToken(authentication);

        LdapUserDetailsImpl userPrincipal = (LdapUserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,
                userPrincipal.getUsername(),roles));
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @PostMapping("/validatetoken")
    public ResponseEntity<?> getTokenByCredentials(@Valid @RequestBody ValidateTokenRequest validateToken) {
        String username = null;
        String jwt =validateToken.getToken();
        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            username = tokenProvider.getUsernameFromJWT(jwt);
            //If required we can have one more check here to load the user from LDAP server
            return ResponseEntity.ok(new ApiResponse(Boolean.TRUE,MessageConstants.VALID_TOKEN + username));
        }else {
            return new ResponseEntity(new ApiResponse(false, MessageConstants.INVALID_TOKEN),
                    HttpStatus.BAD_REQUEST);
        }

    }
}
