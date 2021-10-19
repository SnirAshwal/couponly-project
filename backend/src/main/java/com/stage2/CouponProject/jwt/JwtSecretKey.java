package com.stage2.CouponProject.jwt;

import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

/**
 * configuration class for the JWT's signature algorithm
 */
@Configuration
@RequiredArgsConstructor
public class JwtSecretKey {

    /**
     * a JWTConfig object in order to access its secret key
     */
    private final JwtConfig jwtConfig;

    /**
     * this method encrypts the token with it signature algorithm
     * @return the secret key
     */
    @Bean
    public SecretKey secretKey(){
        return Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
    }
}
