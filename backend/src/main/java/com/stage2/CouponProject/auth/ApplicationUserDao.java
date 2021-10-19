package com.stage2.CouponProject.auth;

import java.util.Optional;

/**
 * an interface for getting the username of a user from the database
 */
public interface ApplicationUserDao {

    /**
     * a function to retrieve the user from teh database based on its username
     * @param username the user username to be returned
     * @return the user which has the given username
     */
    Optional<ApplicationUser> selectApplicationUserByUsername(String username);
}
