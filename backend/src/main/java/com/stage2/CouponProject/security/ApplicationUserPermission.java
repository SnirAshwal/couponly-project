package com.stage2.CouponProject.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * an enum class which represents the available user permissions
 */
@RequiredArgsConstructor
@Getter
public enum ApplicationUserPermission {

    COMPANY_READ("company:read"),
    COMPANY_WRITE("company:write"),
    CUSTOMER_READ("customer:read"),
    CUSTOMER_WRITE("customer:write"),
    COUPON_READ("coupon:read"),
    COUPON_WRITE("coupon:write");

    /**
     * a string representing the user permission
     */
    private final String permission;

}
