package com.stage2.CouponProject.controller;

import com.stage2.CouponProject.exceptions.CompanyException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.exceptions.UserException;
import com.stage2.CouponProject.models.Company;
import com.stage2.CouponProject.models.Customer;
import com.stage2.CouponProject.servicesImpl.AdminServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * a class that has all the methods an admin can preform
 * Admin controller class represent the connection between the client side to server side.
 */
@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {
    /**
     * Initialize adminService object by using required args constructor
     **/
    private final AdminServiceImpl adminService;

    /**
     * get Company from the client and adds to the data base.
     * @param company the company to be added to the database
     * @return Response entity with Http status
     * @throws CompanyException if the company already exists in the data base.
     * @throws UserException if the company email already exists in the data base.
     */
    @PostMapping("addCompany")
    public ResponseEntity<?> addCompany(@RequestBody Company company) throws CompanyException, UserException {
        return new ResponseEntity<>(adminService.addCompany(company), HttpStatus.CREATED);
    }

    /**
     * get company object from the client and then update the company in the data base
     * @param company the company to be updated in the data base
     * @return Response entity with Http status
     * @throws UserException if the company email already exists in the database.
     * @throws CompanyException if the company doesn`t exist in the data base or trying to update email that already
     * exists.
     */
    @PostMapping("updateCompany")
    public ResponseEntity<?> updateCompany(@RequestBody Company company) throws UserException, CompanyException {

        return new ResponseEntity<>(adminService.updateCompany(company), HttpStatus.ACCEPTED);
    }

    /**
     * delete a company from the data base
     * if the company id does not exists in the data base the function will throw an exception.
     *
     * @param companyId the company id to be deleted from the data base
     */
    @DeleteMapping("deleteCompany/{companyId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCompany(@PathVariable("companyId") int companyId) {
        adminService.deleteCompany(companyId);
    }

    /**
     * get all the companies in the data base
     *
     * @return an arrayList of all the companies the that are in the data base and the relevant http status.
     */
    @GetMapping("allCompanies")
    public ResponseEntity<?> getAllCompanies() {
        return new ResponseEntity<>(adminService.getAllCompanies(), HttpStatus.ACCEPTED);
    }

    /**
     *get one company from the data base based on the company id
     * @param companyId the company id of the company being returned
     * @return a company object matching the company id
     * @throws CompanyException if the company does not exist in the database.
     */
    @GetMapping("oneCompany/{companyId}")
    public ResponseEntity<?> getOneCompany(@PathVariable("companyId") int companyId) throws CompanyException {
        return new ResponseEntity<>(adminService.getOneCompany(companyId), HttpStatus.ACCEPTED);
    }

    /**
     * get customer from the client side and adds to the data base.
     * @param customer the customer to be added to the data base
     * @return customer id and http status.
     * @throws CustomerException if the email already exists in the database.
     * @throws UserException if the email already exists in the database.
     */
    @PostMapping("addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) throws CustomerException, UserException {
        return new ResponseEntity<>(adminService.addCustomer(customer), HttpStatus.CREATED);
    }


    /**
     * get customer from the client side and then update the customer in the data base
     * @param customer customer the customer to be updated in the data base
     * @return customer id and http status
     * @throws CustomerException if the customer is not exists in the data base.
     * @throws UserException if the email already exists in the database.
     */
    @PostMapping("updateCustomer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) throws CustomerException, UserException {
        return new ResponseEntity<>(adminService.updateCustomer(customer), HttpStatus.ACCEPTED);
    }


    /**
     * delete a customer from the data base
     *
     * @param customerId the customer id to be deleted from the data base
     */
    @DeleteMapping("deleteCustomer/{customerId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCustomer(@PathVariable("customerId") int customerId) {
        adminService.deleteCustomer(customerId);
    }

    /**
     * get all the customers in the data base
     *
     * @return an arrayList of all the customers the that are in the data base
     */
    @GetMapping("allCustomers")
    public ResponseEntity<?> getAllCustomers() {
        return new ResponseEntity<>(adminService.getAllCustomer(), HttpStatus.ACCEPTED);
    }


    /**
     * get one customer from the data base based on the customer id
     * @param customerId the customer id of the customer being returned
     * @return a customer object and http status
     * @throws CustomerException if the customer is not exists in the database
     */
    @GetMapping("oneCustomer/{customerId}")
    public ResponseEntity<?> getOneCustomer(@PathVariable("customerId") int customerId) throws CustomerException {
        return new ResponseEntity<>(adminService.getOneCustomer(customerId), HttpStatus.ACCEPTED);
    }

    /**
     * This method will show how many companies do we have in the system.
     * @return number of the companies.
     */
    @GetMapping("numberOfCompanies")
    public ResponseEntity<?> numberOfCompanies() {
        return new ResponseEntity<>(adminService.getNumberOfCompanies(), HttpStatus.ACCEPTED);
    }

    /**
     * This method will show how many customers do we have in the system.
     * @return number of the customers.
     */
    @GetMapping("numberOfCustomers")
    public ResponseEntity<?> numberOfCustomers() {
        return new ResponseEntity<>(adminService.getNumberOfCustomers(), HttpStatus.ACCEPTED);
    }

    /**
     * This method will show how many coupons do we have in the system.
     * @return number of the coupons.
     */
    @GetMapping("numberOfCoupons")
    public ResponseEntity<?> numberOfCoupons() {
        return new ResponseEntity<>(adminService.getNumberOfCoupons(), HttpStatus.ACCEPTED);
    }

    /**
     * This method will show how many coupons already purchased in our system.
     * @return number of purchases.
     */
    @GetMapping("numberOfCouponsPurchased")
    public ResponseEntity<?> numberOfCouponsPurchased() {
        return new ResponseEntity<>(adminService.getNumberOfCouponsPurchased(), HttpStatus.ACCEPTED);
    }
}
