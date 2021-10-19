package com.stage2.CouponProject.servicesImpl;

import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Company;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import com.stage2.CouponProject.repositories.CompanyRepository;
import com.stage2.CouponProject.repositories.CouponRepository;
import com.stage2.CouponProject.repositories.CustomerRepository;
import com.stage2.CouponProject.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class contains all the relevant method to the logged in company.
 */
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;

    /**
     * addCoupon method uses two conditions before its actually add new coupon.
     * This method takes the company id of the coupon and checks if its match to the companyID
     * of the logged in company.
     *
     * @param coupon - company coupon.
     */
    @Override
    public int addCoupon(Coupon coupon) throws CouponException {
        System.out.println("Adding a coupon to the database...");
        if (couponRepository.findByCompanyIdAndTitle(coupon.getCompanyId(), coupon.getTitle()) != null) {
            throw new CouponException("This coupon title already exists in this company");
        }
        couponRepository.save(coupon);
        coupon.setId(couponRepository.findByCompanyIdAndTitle(coupon.getCompanyId(), coupon.getTitle()).getId());
        System.out.println("Coupon with ID: " + coupon.getId() + " has been added successfully\n");
        return coupon.getId();
    }

    /**
     * updateCoupon method update the coupon details if the coupon title is not exist in the logged in company.
     *
     * @param coupon will be updated by the company
     */
    @Override
    public void updateCoupon(Coupon coupon) throws CouponException {
        System.out.println("Updating a coupon in the database...");
        Coupon updatedCoupon = couponRepository.findById(coupon.getId()).orElseThrow(() -> new CouponException("This coupon isn`t exists!"));
        for (Coupon companyCoupon : companyRepository.findById(coupon.getCompanyId()).get().getCoupons()) {
            if (coupon.getId() != companyCoupon.getId() && companyCoupon.getTitle().equals(coupon.getTitle()))
                throw new CouponException("This coupon title already exists in this company");
        }
        couponRepository.saveAndFlush(coupon);
        System.out.println("Coupon with ID: " + updatedCoupon.getId() + " has been updated successfully\n");
    }


    /**
     * delete coupon method delete the coupon the coupon purchased history by using couponID and companyID.
     *
     * @param couponId of the coupon that the company want to delete
     */
    @Override
    public void deleteCoupon(int couponId) throws CouponException {
        System.out.println("Deleting coupon from database...");
        couponRepository.findById(couponId).orElseThrow(() -> new CouponException("This coupon isn`t exists!"));
        MAIN:
        for (Customer customer : customerRepository.findAll()) {
            for (Coupon checkedCoupon : customer.getCoupons()) {
                if (checkedCoupon.getId() == couponId) {
                    customer.getCoupons().remove(checkedCoupon);
                    customerRepository.saveAndFlush(customer);
                    continue MAIN;
                }
            }
        }
        couponRepository.deleteById(couponId);
        System.out.println("Coupon with ID: " + couponId + " has been deleted successfully\n");
    }

    /**
     * This method uses the getAllCouponsOfCompany method.
     * The method gets the logged in companyId and returns all of the company coupons.
     *
     * @return an coupons array list.
     */
    @Override
    public List<Coupon> getCompanyCoupons(int companyId) {
        return couponRepository.findByCompanyId(companyId);
    }

    /**
     * This method get all of the coupons of company by entering category and company id.
     *
     * @param category -  Coupons category id.
     * @return a Coupon list by categories that the user or the company inserted.
     */
    @Override
    public List<Coupon> getCompanyCoupons(int companyId, Category category) {
        System.out.println("\nSearching for company coupons by category:" + "\"" + category.name() + "\":");
        return couponRepository.findByCompanyIdAndCategory(companyId, category);
    }

    /**
     * This method get all of the coupons of company by entering max price and company id.
     *
     * @param maxPrice Price limit of the coupons will be displayed by the specific company.
     * @return a coupon list by the max price that the user or the company inserted.
     */
    @Override
    public List<Coupon> getCompanyCoupons(int companyId, double maxPrice) {
        System.out.println("\nSearching for company coupons by maximum price" + "\"" + maxPrice + "\":");
        return couponRepository.findByCompanyIdAndPriceLessThanEqual(companyId, maxPrice);
    }

    /**
     * The method uses getOneCompany method from companiesDBDAO Class. The method prints the company details.
     *
     * @return the Company details.
     */
    @Override
    public Company getCompanyDetails(int companyId) {
        return companyRepository.findById(companyId).get();
    }

    /**
     * a function for getting the amount of coupons a company has
     * @param companyId the company id of which its coupons amount should be returned
     * @return the amount of coupons the company has
     */
    @Override
    public int getNumbersOfCompanyCoupons(int companyId) {
        return couponRepository.countByCompanyId(companyId);
    }

    /**
     * a function for getting the amount of coupons purchased of the company
     * @param companyId the company id of which its purchased coupons amount should be returned
     * @return the amount of company coupons that have been purchased
     */
    @Override
    public int countNumberOfPurchasedCoupons(int companyId) {
        return couponRepository.countAllCouponsPurchasedByCompany(companyId);
    }

}
