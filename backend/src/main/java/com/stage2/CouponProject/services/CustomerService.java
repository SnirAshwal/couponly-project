package com.stage2.CouponProject.services;

import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * The interface of customerServiceClass.
 */
@Component
public interface CustomerService {

    /**
     * When customer want to purchase a coupon we built 1 method with 2 condition to check if the purchase valid.
     * The conditions inside the method checks if the coupon already purchased by this customer and if the amount of
     * the coupon is 0.
     *
     * @param coupon - The coupon that the customer want to purchased.
     */
    void purchaseCoupon (int customerId,Coupon coupon) throws CouponException;

    /**
     * This method checks all the coupon of the logged in.
     * if the customer does not have the coupon, the method will throw an exception to the customer.
     *
     * @param coupon coupon will be deleted.
     */
    void deleteCouponPurchase (int customerId,Coupon coupon) throws CustomerException;

    /**
     * The method uses the getAllCouponsOfCustomer from customerDBDAO.
     *
     * @return an arrayList of all the coupons of customer.
     */
    List<Coupon> getCustomerCoupons (int customerId);

    /**
     * The method receive specific category and return all the coupons of customer by this category.
     *
     * @param category - Coupons category id.
     * @return an arrayList of all the relevant coupons.
     */
    List<Coupon> getCustomerCoupons (int customerId,Category category);

    /**
     * The method receive a maximum price and return all the coupons of customer by this maximum price/ .
     *
     * @param maxPrice - Price limit of the coupons will be displayed
     * @return an arrayList of all the relevant coupons.
     */
    List<Coupon> getCustomerCoupons (int customerId, double maxPrice);



    /**
     * The method will be displayed the customer details.
     *
     * @return customer details.
     */
    Customer getCustomerDetails(int customerId);

}
