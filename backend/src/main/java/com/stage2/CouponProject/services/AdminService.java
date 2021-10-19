package com.stage2.CouponProject.services;

import com.stage2.CouponProject.exceptions.CompanyException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.exceptions.UserException;
import com.stage2.CouponProject.models.Company;
import com.stage2.CouponProject.models.Customer;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * The interface of adminServiceImpl.
 */
@Component
public interface AdminService {


     /**
      * adds a company to the data base
      *
      * @param company the company to be added to the data base
      */
     int addCompany (Company company) throws CompanyException, UserException;

     /**
      * update a company in the data base
      *
      * @param company the company to be updated in the data base
      */
     int updateCompany (Company company) throws UserException, CompanyException;

     /**
      * delete a company from the data base
      * if the company id does not exists in the data base the function will throw an exception.
      * @param companyId the company id to be deleted from the data base
      */
     void deleteCompany (int companyId);

     /**
      * get all the companies in the data base
      *
      * @return an arrayList of all the companies the that are in the data base
      */
     List<Company> getAllCompanies();

     /**
      * get one company from the data base based on the company id
      *
      * @param companyId the company id of the company being returned
      * @return a company object matching the company id
      */
     Company getOneCompany(int companyId) throws CompanyException;

     /**
      * adds a customer to the data base
      *
      * @param customer the customer to be added to the data base
      */
     int addCustomer (Customer customer) throws CustomerException, UserException;

     /**
      * update a customer in the data base
      *
      * @param customer   customer the customer to be updated in the data base
      */
     int updateCustomer (Customer customer) throws CustomerException, UserException;

     /**
      * delete a customer from the data base
      *
      * @param customerId the customer id to be deleted from the data base
      */
     void deleteCustomer (int customerId);

     /**
      * get all the customers in the data base
      *
      * @return an arrayList of all the customers the that are in the data base
      */
     List<Customer> getAllCustomer();

     /**
      * get one customer from the data base based on the customer id
      *
      * @param customerId the customer id of the customer being returned
      * @return a customer object matching the customer id
      */
     Customer getOneCustomer (int customerId) throws CustomerException;


     /**
      * This method will show how many companies do we have in the system.
      * @return number of the companies.
      */
     int getNumberOfCompanies();


     /**
      * This method will show how many customers do we have in the system.
      * @return number of the customers.
      */
     int getNumberOfCustomers();

     /**
      * This method will show how many coupons do we have in the system.
      * @return number of the coupons.
      */
     int getNumberOfCoupons();

     /**
      * This method will show how many coupons already purchased in our system.
      * @return number of purchases.
      */
     int getNumberOfCouponsPurchased();
}
