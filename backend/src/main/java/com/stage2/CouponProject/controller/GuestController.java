package com.stage2.CouponProject.controller;

import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import com.stage2.CouponProject.servicesImpl.GuestServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Guest controller class represent the connection between the client side to server side.
 */
@RestController
@RequestMapping("guest")
@RequiredArgsConstructor
public class GuestController {

    /**
     * Initialize companyRepository object by using required args constructor
     */
    private final GuestServiceImpl guestServiceImpl;

    /**
     Add customer method = Register for the guest.
     * @param customer object will be saved in the database.
     * @return http status.
     * @throws CustomerException will be throw if the email already exists in the database.
     */
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody Customer customer) throws CustomerException {
        try{
            guestServiceImpl.addCustomer(customer);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (CustomerException e){
            throw new CustomerException(e.getMessage());
        }
    }

    /**
     * This method will show all the coupons in the database.
     * @return list of all the coupons
     */
    @GetMapping("getAllCoupons")
    public List<Coupon> getAllCoupons(){
        return guestServiceImpl.getAllCoupons();
    }

    /**
     * This method help us to filter the coupons by category.
     * @param category of the coupons will be shown.
     * @return list of coupons by the specific category and http status
     */
    @GetMapping("getAllCouponsByCategory/{category}")
    public ResponseEntity<?> getCouponsByCategory(@PathVariable("category") Category category){
        return new ResponseEntity<>(guestServiceImpl.getAllCouponsByCategory(category), HttpStatus.ACCEPTED);
    }

    /**
     * This method help us to filter the coupons by maxPrice.
     * @param maxPrice of the coupons will be shown
     * @return list of coupons are filtered by max price and http status
     */
    @GetMapping("getAllCouponsByMaxPrice/{maxPrice}")
    public ResponseEntity<?> getAllCouponsByMaxPrice(@PathVariable("maxPrice") double maxPrice){
        return new ResponseEntity<>(guestServiceImpl.getAllCouponByMaxPrice(maxPrice), HttpStatus.ACCEPTED);
    }

    /**
     * Get all the coupons by the start date.
     * @return list of the relevant coupons and http status
     */
    @GetMapping("getAllCouponsSortedByDate")
    public ResponseEntity<?> getAllCouponsSortedByDate(){
        return new ResponseEntity<>(guestServiceImpl.getAllCouponsByStartDate(), HttpStatus.ACCEPTED);
    }

    /**
     * Sort the coupons by their popularity
     * @return sorted list of the most popular coupons and http status
     */
    @GetMapping("getAllCouponsSortedByPopularity")
    public ResponseEntity<?> getAllCouponsSortedByPopularity(){
        return new ResponseEntity<>(guestServiceImpl.getAllCouponsByPopularity(), HttpStatus.ACCEPTED);
    }

    /**
     * Get all coupons that contains the search word.
     * @param SearchWord that the user search for.
     * @return list of the filtered coupons and http status
     */
    @GetMapping("getAllCouponsBySearchWordInTitle/{SearchWord}")
    public ResponseEntity<?> getAllCouponsBySearchWordInTitle(@PathVariable("SearchWord") String SearchWord){
        return new ResponseEntity<>(guestServiceImpl.getAllCouponsBySearchWordInTitle(SearchWord), HttpStatus.ACCEPTED);
    }

}
