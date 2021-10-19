package com.stage2.CouponProject.jwt;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.stage2.CouponProject.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Date;

/**
 * this class job is to verify the credentials of the token and provide the user a new token
 * if the authentication has been successful
 */
@RequiredArgsConstructor
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    /**
     * an authentication manager object in order to check if the user credentials are correct
     */
    private final AuthenticationManager authenticationManager;

    /**
     * a JWTConfig object in order to give a user a new token if his authentication request has been successful
     */
    private final JwtConfig jwtConfig;

    /**
     * the secret key of the token for the signature algorithm
     */
    private final SecretKey secretKey;

    /**
     * a user repository object in order to access its methods
     */
    private final  UserRepository userRepository;

    /**
     * the function will receive the request, extract the username and password from it,
     * and using the authentication manager will try to authenticate the user,
     * in case of a failed authentication an exception will be thrown
     * @param request the request that comes in
     * @param response the response that will be returned
     * @return an authentication object holding the username and the credentials which include the password
     * @throws AuthenticationException if the authentication fails
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {
            UsernameAndPasswordAuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), UsernameAndPasswordAuthenticationRequest.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), // principal
                    authenticationRequest.getPassword()  // credentials
            );
            return authenticationManager.authenticate(authentication);

        } catch (IOException error) {
            throw new RuntimeException(error);
        }
    }

    /**
     * this method will be invoked after the attempted authentication request has been successful
     * it will generate a new token for the user
     * @param request the request that comes in
     * @param response the response that will be returned
     * @param chain the filter chain which the request goes through when coming in
     * @param authResult the authentication object that is being returned if the attempted authentication has been successful
     * @throws IOException if an I/O exception has occurred
     * @throws ServletException in case of a server issue
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        Claims claims =Jwts.claims().setSubject(authResult.getName());
        claims.put("authorities", authResult.getAuthorities());
        claims.put("id", userRepository.findByEmail(authResult.getName()).getId());
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(Date.from(ZonedDateTime.now()
                        .plusMinutes(Long.parseLong(jwtConfig.getTokenExpirationAfterMinutes())).toInstant()))
                .signWith(secretKey)
                .compact();
        response.addHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + token);
    }
}
