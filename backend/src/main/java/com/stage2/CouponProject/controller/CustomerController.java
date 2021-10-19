package com.stage2.CouponProject.controller;

import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.servicesImpl.CustomerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * controller for customer related actions
 */
@RestController
@RequestMapping("customer")
@RequiredArgsConstructor
public class CustomerController{

    /**
     * customer service object in order to access all its methods
     */
    private final CustomerServiceImpl customerService;

    /**
     * a function for a customer to purchase a coupon
     * @param customerId the customer id of the customer buying the coupon
     * @param coupon the coupon to be purchased
     * @throws CouponException if the customer already purchased the coupon or if there are no more coupons left
     */
    @PostMapping("{customerId}/purchaseCoupon")
    @PreAuthorize("authentication.credentials == #customerId")
    @ResponseStatus(HttpStatus.CREATED)
    public void purchaseCoupon(@PathVariable("customerId") int customerId, @RequestBody Coupon coupon) throws CouponException {
        customerService.purchaseCoupon(customerId ,coupon);
    }

    /**
     * a function for a customer to delete a purchase of a coupon
     * @param customerId the customer id of the customer deleting the coupon purchase
     * @param coupon the coupon to be deleted
     * @throws CustomerException if the coupon hasn't been bought by the customer
     */
    @DeleteMapping("{customerId}/deletePurchaseCoupon")
    @PreAuthorize("authentication.credentials == #customerId")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deletePurchaseCoupon(@PathVariable("customerId") int customerId ,@RequestBody Coupon coupon) throws CustomerException {
        customerService.deleteCouponPurchase(customerId, coupon);
    }

    /**
     * a function for getting all the coupons of a customer from the database
     * @param customerId the customer id of which its coupons should be returned
     * @return the customer coupons
     */
    @GetMapping("{customerId}/coupons")
    @PreAuthorize("authentication.credentials == #customerId")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable("customerId") int customerId){
        return new ResponseEntity<>(customerService.getCustomerCoupons(customerId), HttpStatus.ACCEPTED);
    }

    /**
     *  a function for getting all the coupons of a customer from the database by category
     * @param customerId the customer id of which its coupons should be returned
     * @param category the coupons' category to be returned
     * @return all the coupons of a customer from the specific category
     */
    @GetMapping("{customerId}/couponsByCategory/{category}")
    @PreAuthorize("authentication.credentials == #customerId")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable("customerId") int customerId, @PathVariable("category") Category category){
        return new ResponseEntity<>(customerService.getCustomerCoupons(customerId, category), HttpStatus.ACCEPTED);
    }

    /**
     * a function for getting all the coupons of a customer from the database by a max price
     * @param customerId the customer id of which its coupons should be returned
     * @param maxPrice the max price of the coupons to be returned
     * @return all the coupons of a customer by the max price
     */
    @GetMapping("{customerId}/couponsByMaxPrice/{maxPrice}")
    @PreAuthorize("authentication.credentials == #customerId")
    public ResponseEntity<?> getCustomerCoupons(@PathVariable("customerId") int customerId, @PathVariable("maxPrice") double maxPrice){
        return new ResponseEntity<>(customerService.getCustomerCoupons(customerId, maxPrice), HttpStatus.ACCEPTED);
    }

    /**
     * a function for getting all the customer details from the database
     * @param customerId the customer id of which its details should be returned
     * @return the customer details
     */
    @GetMapping("{customerId}/details")
    @PreAuthorize("authentication.credentials == #customerId")
    public ResponseEntity<?> getCustomerDetails(@PathVariable("customerId") int customerId){
        return new ResponseEntity<>(customerService.getCustomerDetails(customerId), HttpStatus.ACCEPTED);
    }

}
