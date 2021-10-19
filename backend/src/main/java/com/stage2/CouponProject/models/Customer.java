package com.stage2.CouponProject.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * A class that represents a customer object with all it fields
 */
@Entity
@NoArgsConstructor
@Data
@Table(name = "customers")
public class Customer {

    /**
     * The customer id
     */
    @Id
    private int id;

    /**
     * The customer first name
     */
    private String firstName;

    /**
     * The customer last name
     */
    private String lastName;

    /**
     * The customer email
     */
    private String email;

    /**
     * The customer password
     */
    private String password;

    /**
     * An arrayList of type coupon which holds all the customer coupons
     * The relationship between coupons table and customer table is Many To Many and built by unidirectional strategy.
     */
    @ManyToMany(cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    @JoinColumn(name = "coupon_id")
    private List<Coupon> coupons;

    /**
     * This const` receive only the required data.
     * @param firstName of the customer
     * @param lastName of the customer
     * @param email of the customer user
     * @param password of the customer user
     * @param coupons that purchased by the customer.
     */
    public Customer(String firstName, String lastName, String email, String password, List<Coupon> coupons) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }

    /**
     * toString method of the class
     * @return the customer details as a string
     */
    @Override
    public String toString() {
        return "Customer: " +
                "id - " + id +
                ", firstName - " + firstName +
                ", lastName - " + lastName +
                ", email - " + email +
                ", password - " + password +
                ", coupons - " + coupons;
    }
}
