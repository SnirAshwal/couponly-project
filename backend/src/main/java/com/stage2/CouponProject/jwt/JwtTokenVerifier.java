package com.stage2.CouponProject.jwt;

import com.google.common.base.Strings;
import com.stage2.CouponProject.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * this class job is to verify the token whenever a request comes in
 */
@RequiredArgsConstructor
public class JwtTokenVerifier extends OncePerRequestFilter {

    /**
     * a JWTConfig object on order to access all its fields
     */
    private final JwtConfig jwtConfig;

    /**
     * the secret key of the token for the signature algorithm
     */
    private final SecretKey secretKey;

    /**
     * a user repository object in order to access its methods
     */
    private final UserRepository userRepository;

    /**
     * this function receives the request from the server,
     * checks if the request header contains a token,
     * if that is the case, the token is being checked to see if its valid,
     * if so, the user is being granted access to the resource, a new token
     * is generated and being forwarded through the response headers
     * @param request the request that comes in
     * @param response the response that will be returned
     * @param filterChain the filter chain which the request goes through when coming in
     * @throws ServletException in case of a server issue
     * @throws IOException if an I/O exception has occurred
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());
        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.replace(jwtConfig.getTokenPrefix(), "");
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build().parseClaimsJws(token);
            Claims body = claimsJws.getBody();
            String username = body.getSubject();
            var authorities = (List<Map<String, String>>) body.get("authorities");
            int userId = userRepository.findByEmail(username).getId();
            Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                    .map(item -> new SimpleGrantedAuthority(item.get("authority")))
                    .collect(Collectors.toSet());

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    username,
                    userId,
                    simpleGrantedAuthorities
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            Claims claims =Jwts.claims().setSubject(username);
            claims.put("authorities", authorities);
            claims.put("id", userId);
            String newToken = Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(new Date())
                    .setExpiration(Date.from(ZonedDateTime.now()
                            .plusMinutes(Long.parseLong(jwtConfig.getTokenExpirationAfterMinutes())).toInstant()))
                    .signWith(secretKey)
                    .compact();
            response.setHeader(jwtConfig.getAuthorizationHeader(), jwtConfig.getTokenPrefix() + newToken);

        } catch (JwtException error) {
            throw new IllegalStateException("Token " + token + " can not be trusted");
        }
        filterChain.doFilter(request, response);
    }
}
