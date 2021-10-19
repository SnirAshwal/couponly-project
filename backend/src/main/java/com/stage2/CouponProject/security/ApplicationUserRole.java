package com.stage2.CouponProject.security;

import com.google.common.collect.Sets;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.stage2.CouponProject.security.ApplicationUserPermission.*;

/**
 * an enum that represents all the client types that can log in into the system
 */
@RequiredArgsConstructor
@Getter
public enum ApplicationUserRole {
        ADMIN(Sets.newHashSet(COMPANY_READ, COMPANY_WRITE, CUSTOMER_READ, CUSTOMER_WRITE)),
        COMPANY(Sets.newHashSet(COMPANY_READ, COUPON_READ, COUPON_WRITE)),
        CUSTOMER(Sets.newHashSet(CUSTOMER_READ, COUPON_WRITE, COUPON_WRITE));

        /**
         * the user permissions
         */
        private final Set<ApplicationUserPermission> permissions;

        /**
         * a getter function to get all the users authorities as a set of simple granted authorities
         * @return the user authorities
         */
        public Set<SimpleGrantedAuthority> getGrantedAuthorities(){
                Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                        .map(permission-> new SimpleGrantedAuthority(permission.getPermission()))
                        .collect(Collectors.toSet());
                permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
                return permissions;
        }
}
