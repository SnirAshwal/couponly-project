package com.stage2.CouponProject.repositories;

import com.stage2.CouponProject.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This interface helps us to write JPA methods and get the relevant data from the data base.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Checks if the email already exists in the database.
     * @param email will be checked.
     * @return boolean value with the result of the query.
     */
    boolean existsByEmail(String email);

    /**
     * Find user by email.
     * @param email of the customer
     * @return the relevant user with the matched mail.
     */
    User findByEmail(String email);

}
