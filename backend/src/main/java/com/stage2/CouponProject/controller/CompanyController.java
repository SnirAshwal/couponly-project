package com.stage2.CouponProject.controller;

import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.servicesImpl.CompanyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * controller for company related actions
 */
@RestController
@RequestMapping("company")
@RequiredArgsConstructor
public class CompanyController{

    /**
     * company service object in order to access all its methods
     */
    private final CompanyServiceImpl companyService;

    /**
     * a function for adding a coupon to the database
     * @param coupon the coupon to be added to the database
     * @param companyId the company id of the company adding the coupon
     * @return the added coupon id
     * @throws CouponException if the coupon title already exist in the company coupons
     */
    @PostMapping("{companyId}/addCoupon")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon, @PathVariable("companyId") int companyId) throws CouponException {
        return new ResponseEntity<>(companyService.addCoupon(coupon), HttpStatus.CREATED);
    }

    /**
     * a function for updating a coupon in the database
     * @param coupon the coupon to be updated in the database
     * @param companyId the company id of the company updating the coupon
     * @throws CouponException if the coupon title already exist in the company coupons
     */
    @PostMapping("{companyId}/updateCoupon")
    @PreAuthorize("authentication.credentials == #companyId")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateCoupon(@RequestBody Coupon coupon, @PathVariable("companyId") int companyId) throws CouponException {
        companyService.updateCoupon(coupon);
    }

    /**
     * a function for deleting a coupon from the database
     * @param couponId the coupon id to be deleted from the database
     * @param companyId the company id of the company deleting the coupon
     * @throws CouponException if the coupon does not exist
     */
    @DeleteMapping("{companyId}/deleteCoupon/{couponId}")
    @PreAuthorize("authentication.credentials == #companyId")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCoupon(@PathVariable("couponId") int couponId ,@PathVariable("companyId") int companyId) throws CouponException {
        companyService.deleteCoupon(couponId);
    }

    /**
     * a function for getting all the coupons of a company from the database
     * @param companyId the company id of which its coupons should be returned
     * @return the company coupons
     */
    @GetMapping("{companyId}/coupons")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> getCompanyCoupons(@PathVariable("companyId") int companyId){
        return new ResponseEntity<>(companyService.getCompanyCoupons(companyId), HttpStatus.ACCEPTED);
    }

    /**
     * a function for getting all the coupons of a company from the database by category
     * @param companyId the company id of which its coupons should be returned
     * @param category the coupons' category to be returned
     * @return all the coupons of a company from the specific category
     */
    @GetMapping("{companyId}/couponsByCategory/{category}")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> getCompanyCoupons(@PathVariable("companyId") int companyId,@PathVariable("category") Category category){
        return new ResponseEntity<>(companyService.getCompanyCoupons(companyId,category), HttpStatus.ACCEPTED);
    }

    /**
     * a function for getting all the coupons of a company from the database by a max price
     * @param companyId the company id of which its coupons should be returned
     * @param maxPrice the max price of the coupons to be returned
     * @return all the coupons of a company by the max price
     */
    @GetMapping("{companyId}/couponsByMaxPrice/{maxPrice}")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> getCompanyCoupons(@PathVariable("companyId") int companyId,@PathVariable("maxPrice") double maxPrice){
        return new ResponseEntity<>(companyService.getCompanyCoupons(companyId,maxPrice), HttpStatus.ACCEPTED);
    }

    /**
     * a function for getting all the company details from the database
     * @param companyId the company id of which its details should be returned
     * @return the company details
     */
    @GetMapping("{companyId}/details")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> getCompanyDetails(@PathVariable("companyId") int companyId){
        return new ResponseEntity<>(companyService.getCompanyDetails(companyId), HttpStatus.ACCEPTED);
    }

    /**
     * a function for getting the amount of coupons a company has
     * @param companyId the company id of which its coupons amount should be returned
     * @return the amount of coupons the company has
     */
    @GetMapping("{companyId}/numOfCoupons")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> getNumbersOfCompanyCoupons(@PathVariable("companyId") int companyId){
        return new ResponseEntity<>(companyService.getNumbersOfCompanyCoupons(companyId), HttpStatus.ACCEPTED);
    }

    /**
     *  a function for getting the amount of coupons purchased of the company
     * @param companyId the company id of which its purchased coupons amount should be returned
     * @return the amount of company coupons that have been purchased
     */
    @GetMapping("{companyId}/numOfPurchasedCoupons")
    @PreAuthorize("authentication.credentials == #companyId")
    public ResponseEntity<?> countNumberOfPurchasedCoupons(@PathVariable("companyId") int companyId){
        return new ResponseEntity<>(companyService.countNumberOfPurchasedCoupons(companyId), HttpStatus.ACCEPTED);
    }

}
