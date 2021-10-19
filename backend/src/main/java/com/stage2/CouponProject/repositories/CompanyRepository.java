package com.stage2.CouponProject.repositories;

import com.stage2.CouponProject.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * This interface helps us to write JPA methods and get the relevant data from the data base.
 */
@Repository
public interface CompanyRepository extends JpaRepository <Company , Integer> {

    /**
     * The method checks if the email of the company is already exists in the data base.
     * @param email of the company.
     * @return boolean value that represent the answer of this query.
     */
    boolean existsCompanyByEmail(String email);

    /**
     * The method checks if the name company is already exists in the data base.
     * @param name of the company.
     * @return boolean value that represent the answer of this query.
     */
    boolean existsCompanyByName(String name);

    /**
     * The method checks if the emain and the password of the company is already exists in the data base.
     * @param email of the company.
     * @param password of the company.
     * @return boolean value that represent the answer of this query.
     */
    boolean existsCompanyByEmailAndPassword(String email, String password);

    /**
     * This method finds company in the data base by inserting email
     * @param email of the company
     * @return Company object.
     */
    Company findByEmail(String email);

    /**
     * This method finds company in the data base by inserting name
     * @param name of the company
     * @return Company object.
     */
    Company findByName(String name);

    /**
     * This method counts the number of companies already have the inserted email.
     * @param email of the company
     * @return number of times that the email exists in the database.
     */
    int countByEmail(String email);

    /**
     * Get all the companies in the database by using custom query.
     * @return number of companies in the database will be shown in the dashboard.
     */
    @Query(value = "SELECT COUNT(*) FROM companies", nativeQuery = true)
    int countAllCompanies();
}
