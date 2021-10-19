package com.stage2.CouponProject.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

/**
 * An application user class which implements the UserDetails interface
 * in order to create an object of a user for spring security to identify his authorities
 * and details when a user is trying to make a request
 */
@RequiredArgsConstructor
public class ApplicationUser implements UserDetails {

    /**
     * the user username
     */
    private final String username;

    /**
     * the user password
     */
    private final String password;

    /**
     * the user authorities as a set
     */
    private final Set<? extends GrantedAuthority> grantedAuthorities;

    /**
     * a boolean value to determinate if a user account has expired
     */
    private final boolean isAccountNonExpired;

    /**
     * a boolean value to determinate if a user account is not locked
     */
    private final boolean isAccountNonLocked;

    /**
     * a boolean value to determinate if the user credentials haven't been expired
     */
    private final boolean isCredentialsNonExpired;

    /**
     * a boolean value to determinate if the user account is enabled
     */
    private final boolean isEnabled;

    /**
     * user authorities getter function
     * @return all the user authorities and role as a set
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    /**
     * user password getter function
     * @return the user password
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * user username getter function
     * @return the user username
     */
    @Override
    public String getUsername() {
        return username;
    }

    /**
     * isAccountNonExpired getter function
     * @return if the user account has been expired
     */
    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    /**
     * isAccountNonLocked getter function
     * @return if the user account is not locked
     */
    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    /**
     * isCredentialsNonExpired getter function
     * @return if the user credentials haven't been expired
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    /**
     * isEnabled getter function
     * @return if the user account has been enabled
     */
    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
