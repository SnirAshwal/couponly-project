package com.stage2.CouponProject.repositories;

import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

/**
 * This interface helps us to write JPA methods and get the relevant data from the data base.
 */
@Repository
public interface CouponRepository extends JpaRepository<Coupon , Integer> {

    /**
     * This method finds specific coupon by using the company id and the title of coupon.
     * @param companyId of the company that create this coupon
     * @param title of the coupon
     * @return Coupon object
     */
    Coupon findByCompanyIdAndTitle(int companyId, String title);


    /**
     * This method find coupon by company id.
     * The method helps us to get all of the coupons of specific company.
     * @param companyId of the relevant company
     * @return List of all the company coupons.
     */
    List<Coupon> findByCompanyId(int companyId);

    /**
     * Find all the coupons until the inserted date.
     * @param date defines the coupons list by the inserted date.
     * @return list of all the coupons until the inserted date.
     */
    List<Coupon> findByEndDateBefore(Date date);

    /**
     * The method finds the coupons with the id and the category that the company inserted.
     * @param companyId of the logged in company.
     * @param category of the coupon.
     * @return a Coupon list by categories that the user or the company inserted.
     */
    List<Coupon> findByCompanyIdAndCategory(int companyId, Category category);

    /**
     * The method finds the coupons with the id and the price that the company inserted.
     * @param companyId of the logged in company.
     * @param price of the coupon.
     * @return a Coupon list by price that the user or the company inserted.
     */
    List<Coupon> findByCompanyIdAndPriceLessThanEqual(int companyId, double price);

    /**
     * This repo responsible to get coupons by category.
     * @param category of the coupons will be shown.
     * @return list of the relevant coupons.
     */
    List<Coupon> findByCategory(Category category);

    /**
     * This repo responsible to get coupons by maximum price.
     * @param maxPrice of the coupons will be shown.
     * @return list of the relevant coupons.
     */
    List<Coupon> findByPrice(double maxPrice);

    /**
     * Sort the coupons by start date.
     * We use this repo in the main page of the website.
     * @return sorted list of the coupons.
     */
    List<Coupon> findByOrderByStartDateDesc();


    /**
     * Sort the coupons by the most purchased coupons.
     * We use this repo in the main page of the website.
     * @return sorted list of the most popular coupons.
     */
    @Query(value = "SELECT coupons_id FROM customers_coupons ORDER BY coupons_id ASC", nativeQuery = true)
    List<Integer> findByPopularity();

    /**
     * Get all coupons that contains the search word.
     * @param searchWord that the user search for.
     * @return list of the filtered coupons.
     */
    List<Coupon> findByTitleContaining(String searchWord);

    /**
     * Count all the coupons in the data base.
     * @return number of the coupons in the database.
     */
    @Query(value = "SELECT COUNT(*) FROM coupons", nativeQuery = true)
    int countAllCoupons();

    /**
     * Count all the purchased coupons.
     * @return number of the purchased coupons.
     */
    @Query(value = "SELECT COUNT(*) FROM customers_coupons", nativeQuery = true)
    int countAllCouponsPurchased();

    /**
     * Count all the coupons of specific company.
     * @param companyId of the coupons
     * @return number of the counted coupons.
     */
    int countByCompanyId(int companyId);

    /**
     * Count all the coupons that purchased of specific company.
     * @param companyId of the coupons.
     * @return number of the counted coupons.
     */
    @Query(value = "SELECT COUNT(*) FROM customers_coupons AS cvc INNER JOIN coupons AS c On cvc.coupons_id = c.id WHERE company_id = ?1" , nativeQuery = true)
    int countAllCouponsPurchasedByCompany(int companyId);



}
