package com.stage2.CouponProject.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * the job of this class is implement the application user repository and get the user.
 * if the user isn't exists, an exception will be thrown
 */
@Service
public class ApplicationUserService implements UserDetailsService {

    /**
     * ApplicationUserDao object in order to access the method to get the user
     */
    private final ApplicationUserDao applicationUserDao;

    /**
     * a class constructor which uses the MySQL configuration
     * @param applicationUserDao the mySQL repository
     */
    @Autowired
    public ApplicationUserService(@Qualifier("mySQL") ApplicationUserDao applicationUserDao) {
        this.applicationUserDao = applicationUserDao;
    }

    /**
     * this method loads the user using the user repository
     * @param username the username of the user to be fetched
     * @return ApplicationUser object with teh user details
     * @throws UsernameNotFoundException if the user does not exist
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return applicationUserDao.selectApplicationUserByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("user with name " + username + " has not been found"));
    }

}
