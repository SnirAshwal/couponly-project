package com.stage2.CouponProject.services;

import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Company;
import com.stage2.CouponProject.models.Coupon;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * The interface of companyServiceClass.
 */
@Component
public interface CompanyService {

    /**
     * addCoupon method uses two conditions before its actually add new coupon.
     * This method takes the company id of the coupon and checks if its match to the companyID
     * of the logged in company.
     *
     * @param coupon - company coupon.
     */
    int addCoupon(Coupon coupon) throws CouponException;

    /**
     * updateCoupon method update the coupon details if the coupon title is not exist in the logged in company.
     *
     * @param coupon will be updated by the company
+     */
    void updateCoupon(Coupon coupon) throws CouponException;

    /**
     * delete coupon method delete the coupon purchased history by using couponID and companyID.
     *
     * @param couponId of the coupon that the company want to delete
     */
    void deleteCoupon(int couponId) throws CouponException;

    /**
     * This method uses the getAllCouponsOfCompany method.
     * The method gets the logged in companyId and returns all of the company coupons.
     *
     * @return a coupons array list.
     */
    List<Coupon> getCompanyCoupons(int CompanyId);

    /**
     * This method gets all the coupons of company by entering category and company id.
     *
     * @param category -  Coupons category id.
     * @return a Coupon array list by categories that the user or the company inserted.
     */
    List<Coupon> getCompanyCoupons(int companyId, Category category);

    /**
     * This method gets all the coupons of company by entering max price and company id.
     *
     * @param maxPrice Price limit of the coupons will be displayed by the specific company.
     * @return a coupon array list by the max price that the user or the company inserted.
     */
    List<Coupon> getCompanyCoupons(int companyId,double maxPrice);

    /**
     * The method uses getOneCompany method from companiesDBDAO Class. The method prints the company details.
     *
     * @return the Company details.
     */
    Company getCompanyDetails(int companyId);

    /**
     * a function for getting the amount of coupons a company has
     * @param companyId the company id of which its coupons amount should be returned
     * @return the amount of coupons the company has
     */
    int getNumbersOfCompanyCoupons(int companyId);

    /**
     * a function for getting the amount of coupons purchased of the company
     * @param companyId the company id of which its purchased coupons amount should be returned
     * @return the amount of company coupons that have been purchased
     */
    int countNumberOfPurchasedCoupons(int companyId);

    }
