package com.stage2.CouponProject.servicesImpl;

import com.stage2.CouponProject.exceptions.CompanyException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.exceptions.UserException;
import com.stage2.CouponProject.models.Company;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import com.stage2.CouponProject.models.User;
import com.stage2.CouponProject.repositories.CompanyRepository;
import com.stage2.CouponProject.repositories.CouponRepository;
import com.stage2.CouponProject.repositories.CustomerRepository;
import com.stage2.CouponProject.repositories.UserRepository;
import com.stage2.CouponProject.security.ApplicationUserRole;
import com.stage2.CouponProject.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * a class that has all the methods an admin can preform
 * the class extents the clientServiceImpl interface in order to log into the system and implement the AdminService
 * interface.
 */
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    /**
     * Initialize companyRepository object by using required args constructor
     */
    private final CompanyRepository companyRepository;
    /**
     * Initialize customerRepository object by using required args constructor
     */
    private final CustomerRepository customerRepository;
    /**
     * Initialize couponRepository object by using required args constructor
     */
    private final CouponRepository couponRepository;
    /**
     * Initialize userRepository object by using required args constructor
     */
    private final UserRepository userRepository;

    /**
     * get Company from the controller and adds to the data base.
     * @param company the company to be added to the database
     * @return company id
     * @throws CompanyException if the company already exists in the data base.
     * @throws UserException if the company email already exists in the data base.
     */
    @Override
    public int addCompany(Company company) throws CompanyException, UserException {
        System.out.println("\nAdding a company in the database...");
        if (companyRepository.existsCompanyByEmail(company.getEmail())) {
            throw new CompanyException("The email: \"" + company.getEmail() + "\" already exists in the data base.");
        }
        if (companyRepository.existsCompanyByName(company.getName())) {
            throw new CompanyException("The name: \"" + company.getName() + "\" already exists in the data base.");
        }
        if (userRepository.existsByEmail(company.getEmail())) {
            throw new UserException("The email: \"" + company.getEmail() + "\" already exists in the data base.");
        }
        userRepository.save(new User(company.getEmail(), company.getPassword(), ApplicationUserRole.COMPANY));
        int companyId = userRepository.findByEmail(company.getEmail()).getId();
        company.setId(companyId);
        companyRepository.save(company);
        System.out.printf("Adding succeed:\nCompany \"%s\" has been added successfully\n", company.getName());
        return companyId;
    }


    /**
     * update a company in the data base
     * @param company the company to be updated in the data base
     * @return company id
     * @throws UserException if the company email already exists in the database.
     * @throws CompanyException if the company doesn`t exist in the data base or trying to update email that already
     * exists.
     */
    @Override
    public int updateCompany(Company company) throws UserException, CompanyException {
        System.out.println("\nUpdating a company in the data base...");
        if (!companyRepository.existsCompanyByName(company.getName())) {
            throw new CompanyException("This company is not exists.....");
        }
        Company companyToBeUpdated = companyRepository.findByName(company.getName());
        if (companyRepository.countByEmail(company.getEmail()) > 0 && !companyToBeUpdated.getName().equals(companyRepository.findByEmail(company.getEmail()).getName())) {
            throw new CompanyException("This email already exists in the system in another company!");
        }
        if (userRepository.existsByEmail(company.getEmail())) {
            throw new UserException("The email: \"" + company.getEmail() + "\" already exists in the data base.");
        }
        company.setCoupons(getOneCompany(company.getId()).getCoupons());
        userRepository.saveAndFlush(new User(company.getId(), company.getEmail(), company.getPassword(), ApplicationUserRole.COMPANY));
        companyRepository.saveAndFlush(company);
        System.out.println("Coupon with ID: " + company.getId() + " has been updated successfully\n");
        return company.getId();
    }

    /**
     * delete a company from the data base
     * if the company id does not exists in the data base the function will throw an exception.
     *
     * @param companyId the company id to be deleted from the data base
     */
    @Override
    public void deleteCompany(int companyId) {
        System.out.println("\nDeleting company from the database...");
        try {
            companyRepository.findById(companyId).orElseThrow(() -> new CompanyException("This company isn`t exists.....\n"));
            MAIN:
            for (Customer customer : customerRepository.findAll()) {
                for (Coupon checkedCoupon : customer.getCoupons()) {
                    if (checkedCoupon.getCompanyId() == companyId) {
                        customer.getCoupons().remove(checkedCoupon);
                        customerRepository.saveAndFlush(customer);
                        continue MAIN;
                    }
                }
            }
            userRepository.deleteById(userRepository.findByEmail(companyRepository.findById(companyId).get().getEmail()).getId());
            companyRepository.deleteById(companyId);
            System.out.printf("Company with id: %d has been deleted successfully\n", companyId);
        } catch (CompanyException err) {
            System.out.println("Deleting failed:\n" + err.getMessage());
        }

    }

    /**
     * get all the companies in the data base
     *
     * @return an arrayList of all the companies the that are in the data base
     */
    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

   /**
     *get one company from the data base based on the company id
     * @param companyId the company id of the company being returned
     * @return a company object matching the company id
     * @throws CompanyException if the company is not exist in the database.
     */
    @Override
    public Company getOneCompany(int companyId) throws CompanyException {
            System.out.println("Searching for company with id: " + companyId);
            return companyRepository.findById(companyId).orElseThrow(() -> new CompanyException("This company does not exists"));
    }


    /**
     * get customer from the controller and adds to the data base.
     * @param customer the customer to be added to the data base
     * @return customer id
     * @throws CustomerException if the email already exists in the database.
     * @throws UserException if the email already exists in the database.
     */
    @Override
    public int addCustomer(Customer customer) throws CustomerException, UserException {
        System.out.println("\nAdding a customer to the database...");
        if (customerRepository.existsCustomerByEmail(customer.getEmail())) {
            throw new CustomerException("The email: \"" + customer.getEmail() + "\" already exists in the data base.");
        }
        if (userRepository.existsByEmail(customer.getEmail())) {
            throw new UserException("The email: \"" + customer.getEmail() + "\" already exists in the data base.");
        }
        System.out.printf("Adding succeed:\nCustomer \"%s\" has been added successfully\n", customer.getFirstName());
        userRepository.save(new User(customer.getEmail(), customer.getPassword(), ApplicationUserRole.CUSTOMER));
        int customerId = userRepository.findByEmail(customer.getEmail()).getId();
        customer.setId(customerId);
        customerRepository.save(customer);
        return customerId;
    }

    /**
     * update a customer in the data base
     * @param customer customer the customer to be updated in the data base
     * @return customer id
     * @throws CustomerException if the customer is not exists in the data base.
     * @throws UserException if the email already exists in the database.
     */
    @Override
    public int updateCustomer(Customer customer) throws CustomerException, UserException {
        System.out.println(customer);
        System.out.println("\nUpdating a customer in the data base...");
        customerRepository.findById(customer.getId()).orElseThrow(() -> new CustomerException("This customer is not exists....."));
        if (customerRepository.existsCustomerByEmail(customer.getEmail()) && customerRepository.findByEmail(customer.getEmail()).getId() != customer.getId()) {
            throw new CustomerException("This email already exists in the system in another customer!");
        }
        if (userRepository.existsByEmail(customer.getEmail()) && !customer.getEmail().equals(userRepository.findById(customer.getId()).get().getEmail())) {
            throw new UserException("The email: \"" + customer.getEmail() + "\" already exists in the data base.");
        }
        userRepository.saveAndFlush(new User(customer.getId(),customer.getEmail(), customer.getPassword(), ApplicationUserRole.CUSTOMER));
        customerRepository.saveAndFlush(customer);
        return customer.getId();
    }

    /**
     * delete a customer from the data base
     *
     * @param customerId the customer id to be deleted from the data base
     */
    @Override
    public void deleteCustomer(int customerId) {
        System.out.println("\nDeleting a customer from the data base...");
        try {
            customerRepository.findById(customerId).orElseThrow(() -> new CustomerException("This customer is not exists....."));
            MAIN:
            for (Customer customer : customerRepository.findAll()) {
                for (Coupon checkedCoupon : customer.getCoupons()) {
                    customer.getCoupons().remove(checkedCoupon);
                    customerRepository.saveAndFlush(customer);
                    continue MAIN;
                }
            }
            userRepository.deleteById((userRepository.findByEmail(customerRepository.findById(customerId).get().getEmail())).getId());
            customerRepository.deleteById(customerId);
            System.out.println("Deleting succeed:\nCustomer with ID: " + customerId + " has been deleted successfully");
        } catch (CustomerException err) {
            System.out.println("Deleting failed:\n" + err.getMessage() + "\n");
        }
    }

    /**
     * get all the customers in the data base
     *
     * @return an arrayList of all the customers the that are in the data base
     */
    @Override
    public List<Customer> getAllCustomer() {
        return customerRepository.findAll();
    }


    /**
     * get one customer from the data base based on the customer id
     * @param customerId the customer id of the customer being returned
     * @return a customer object matching the customer id
     * @throws CustomerException if the customer is not exists in the database
     */
    @Override
    public Customer getOneCustomer(int customerId) throws CustomerException {
        System.out.println("\nSearching for customer with id: " + customerId);
            return customerRepository.findById(customerId).orElseThrow(() -> new CustomerException("This customer does not exists....."));

    }

    /**
     * This method will show how many companies do we have in the system.
     * @return number of the companies.
     */
    @Override
    public int getNumberOfCompanies() {
        return companyRepository.countAllCompanies();
    }


    /**
     * This method will show how many customers do we have in the system.
     * @return number of the customers.
     */
    @Override
    public int getNumberOfCustomers() {
        return customerRepository.countAllCustomers();
    }

    /**
     * This method will show how many coupons do we have in the system.
     * @return number of the coupons.
     */
    @Override
    public int getNumberOfCoupons() {
        return couponRepository.countAllCoupons();
    }

    /**
     * This method will show how many coupons already purchased in our system.
     * @return number of purchases.
     */
    @Override
    public int getNumberOfCouponsPurchased() {
        return couponRepository.countAllCouponsPurchased();
    }
}
