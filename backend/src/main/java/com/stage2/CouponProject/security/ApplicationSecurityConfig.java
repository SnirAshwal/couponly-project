package com.stage2.CouponProject.security;
import com.stage2.CouponProject.auth.ApplicationUserService;
import com.stage2.CouponProject.jwt.JwtConfig;
import com.stage2.CouponProject.jwt.JwtTokenVerifier;
import com.stage2.CouponProject.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.stage2.CouponProject.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.SecretKey;

import static com.stage2.CouponProject.security.ApplicationUserRole.*;


/**
 * the security configuration class
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * in order to encode the user password
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * an ApplicationUserService Object
     */
    private final ApplicationUserService applicationUserService;

    /**
     *  a SecretKey Object
     */
    private final SecretKey secretKey;

    /**
     * a JWTConfig object
     */
    private final JwtConfig jwtConfig;

    /**
     * a UserRepository Object
     */
    private final UserRepository userRepository;

    /**
     * the configure method holds all the different authorization levels of the system,
     * the request is being verified by the JWT filters and then permitting access to the system resources
     * based on the user authorities,
     * if the user is unauthorized an exception is being thrown
     * @param http the http request being received from the server
     * @throws Exception if a user is unauthorized
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfig, secretKey, userRepository))
                .addFilterAfter(new JwtTokenVerifier(jwtConfig, secretKey, userRepository), JwtUsernameAndPasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/guest/**").permitAll()
                .antMatchers("/admin/**").hasRole(ADMIN.name())
                .antMatchers("/company/**").hasRole(COMPANY.name())
                .antMatchers("/customer/**").hasRole(CUSTOMER.name())
                .anyRequest()
                .authenticated();
    }

    /**
     * configure the authentication provider
     * @param auth holds all the user authentication details
     * @throws Exception if the user is not authenticated
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    /**
     * configure the auth provider
     * @return the authentication provider
     */
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(applicationUserService);
        return provider;
    }



}
