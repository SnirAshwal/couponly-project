package com.stage2.CouponProject.models;

import com.stage2.CouponProject.security.ApplicationUserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

/**
 * A class that represents a user object with all it fields.
 * The user fields fill up automatically when Customer or Company saved.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * user id, autogenerated in the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    /**
     * User email, most be unique.
     */
    private String email;

    /**
     * User password.
     */
    private String password;

    /**
     * The userType field help us to set the roles for the users.
     */
    @Enumerated (EnumType.STRING)
    private ApplicationUserRole userType;

    /**
     * User constructor exclude id field.
     * @param email of the company or the customer.
     * @param password of the company or the customer.
     * @param userType of the user. can be Admin \ Company \ User.
     */
    public User(String email, String password, ApplicationUserRole userType) {
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
}