package com.stage2.CouponProject.jwt;

import com.google.common.net.HttpHeaders;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * JWT token configuration
 */
@ConfigurationProperties(prefix = "application.jwt")
@Configuration
@Getter
@Setter
@NoArgsConstructor
public class JwtConfig {

    /**
     * the secret key of the token
     */
    private String secretKey;

    /**
     * the token prefix
     */
    private String tokenPrefix;

    /**
     * expiration time of the token in minutes
     */
    private String tokenExpirationAfterMinutes;

    /**
     * returns the token as a string from the request header
     * @return the token as a string
     */
    public String getAuthorizationHeader(){
        return HttpHeaders.AUTHORIZATION;
    }
}
