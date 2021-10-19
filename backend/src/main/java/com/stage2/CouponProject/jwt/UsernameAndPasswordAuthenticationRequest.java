package com.stage2.CouponProject.jwt;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * this class helps us grab the username and password sent by the client
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsernameAndPasswordAuthenticationRequest {

    /**
     * the user username
     */
    private String username;

    /**
     * the user password
     */
    private String password;
}
