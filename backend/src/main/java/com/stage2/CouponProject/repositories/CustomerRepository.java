package com.stage2.CouponProject.repositories;

import com.stage2.CouponProject.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * This interface helps us to write JPA methods and get the relevant data from the data base.
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer , Integer> {

    /**
     * The method checks if the email of the customer is already exists in the data base.
     * @param email of the customer.
     * @return boolean value that represent the answer of this query.
     */
    boolean existsCustomerByEmail(String email);

    /**
     * The method checks if the email and the password of the customer is already exists in the data base.
     * @param email of the customer.
     * @param password of the customer.
     * @return boolean value that represent the answer of this query.
     */
    boolean existsCustomerByEmailAndPassword(String email, String password);

    /**
     * This method finds customer in the data base by inserting email
     * @param email of the company
     * @return customer object.
     */
    Customer findByEmail(String email);

    /**
     * Count all the customers in the data base.
     * @return number of customers.
     */
    @Query(value = "SELECT COUNT(*) FROM customers", nativeQuery = true)
    int countAllCustomers();


}
