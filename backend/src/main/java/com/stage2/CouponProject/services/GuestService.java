package com.stage2.CouponProject.services;

import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import java.util.List;

/**
 * The interface of guestServiceClass.
 */
public interface GuestService {

    /**
     * Add customer method = Register for the guest.
     *
     * @param customer object will be saved in the database.
     * @throws CustomerException will be throw if the email already exists in the database.
     */
    void addCustomer(Customer customer) throws CustomerException;

    /**
     * This method will show all the coupons in the database.
     * @return list of all the coupons.
     */
    List<Coupon> getAllCoupons ();

    /**
     * This method help us to filter the coupons by category.
     * @param category of the coupons will be shown.
     * @return list of coupons by the specific category.
     */
    List<Coupon> getAllCouponsByCategory (Category category);

    /**
     * This method help us to filter the coupons by maxPrice.
     * @param maxPrice of the coupons will be shown
     * @return list of coupons are filtered by max price.
     */
    List<Coupon> getAllCouponByMaxPrice (double maxPrice);

    /**
     * Get all the coupons by the start date.
     * @return list of the relevant coupons.
     */
    List<Coupon> getAllCouponsByStartDate();

    /**
     * Sort the coupons by their popularity
     * @return sorted list of the most popular coupons.
     */
    List<Coupon> getAllCouponsByPopularity();

    /**
     * Get all coupons that contains the search word.
     * @param searchWord that the user search for.
     * @return list of the filtered coupons.
     */
    List<Coupon> getAllCouponsBySearchWordInTitle(String searchWord);


}
