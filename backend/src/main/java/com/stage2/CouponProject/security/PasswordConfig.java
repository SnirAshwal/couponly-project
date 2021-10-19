package com.stage2.CouponProject.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * the password configuration class
 */
@Configuration
public class PasswordConfig {

    /**
     * initialize the password encoder of type BCryptPasswordEncoder
     * @return the password encoder which the user password wil be encoded with
     */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
}
