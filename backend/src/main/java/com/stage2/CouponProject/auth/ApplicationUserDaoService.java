package com.stage2.CouponProject.auth;

import com.stage2.CouponProject.models.User;
import com.stage2.CouponProject.repositories.UserRepository;
import com.stage2.CouponProject.security.ApplicationUserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * the repository spring security uses in order to retrieve the user from the database
 * if it is exists
 */
@Repository("mySQL")
@RequiredArgsConstructor
public class ApplicationUserDaoService implements ApplicationUserDao{

    /**
     * user repository object in order to use it method to get a user by his email
     */
    private final UserRepository userRepository;

    /**
     * in order to encode the user password
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * this function get teh user from the database based on its email,
     * then, it updates the user authorities based on its role and return the user
     * @param username the user username to be returned
     * @return ApplicationUser objects if the suer does exist
     */
    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        User user = userRepository.findByEmail(username);
        Optional<ApplicationUser> userOptional = Optional.empty();
        switch (user.getUserType().name()){
            case "ADMIN":
                userOptional = Optional.of(new ApplicationUser(
                        user.getEmail(),
                        passwordEncoder.encode(user.getPassword()),
                        ApplicationUserRole.ADMIN.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true
                ));
                break;
            case "COMPANY":
                userOptional = Optional.of(new ApplicationUser(
                        user.getEmail(),
                        passwordEncoder.encode(user.getPassword()),
                        ApplicationUserRole.COMPANY.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true
                ));
                break;
            case "CUSTOMER":
                userOptional = Optional.of(new ApplicationUser(
                        user.getEmail(),
                        passwordEncoder.encode(user.getPassword()),
                        ApplicationUserRole.CUSTOMER.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true
                ));
        }
        return userOptional;
    }
}
