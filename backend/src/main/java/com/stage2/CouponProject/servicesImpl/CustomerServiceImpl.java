package com.stage2.CouponProject.servicesImpl;

import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import com.stage2.CouponProject.repositories.CouponRepository;
import com.stage2.CouponProject.repositories.CustomerRepository;
import com.stage2.CouponProject.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * This class contains all the relevant method to the logged in customer.
 */
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;

    /**
     * When customer want to purchase a coupon we built 1 method with 2 condition to check if the purchase valid.
     * The conditions inside the method checks if the coupon already purchased by this customer and if the amount of
     * the coupon is 0.
     *
     * @param coupon - The coupon that the customer want to purchased.
     */
    @Override
    public void purchaseCoupon(int customerId,Coupon coupon) throws CouponException {
        System.out.println("Purchase a coupon... ");
            Customer customer = customerRepository.findById(customerId).get();
            List<Coupon> customerCoupons = customer.getCoupons();
            for (Coupon checkedCoupon : customerCoupons) {
                if (checkedCoupon.getId() == coupon.getId())
                    throw new CouponException("This coupon is already purchased by this customer");
            }
            Coupon purchasedCoupon = couponRepository.findById(coupon.getId()).get();
            if (purchasedCoupon.getAmount() == 0) throw new CouponException("This coupon amount is over");
            purchasedCoupon.setAmount(coupon.getAmount() - 1);
            coupon.setAmount(purchasedCoupon.getAmount());
            couponRepository.saveAndFlush(purchasedCoupon);
            customerCoupons.add(purchasedCoupon);
            customer.setCoupons(customerCoupons);
            customerRepository.saveAndFlush(customer);
            System.out.println("Coupon " + coupon.getId() + " has been purchased successfully by customer " + customerId + "\n");
    }

    /**
     * This method checks all the coupon of the logged in.
     * if the customer does not have the coupon, the method will throw an exception to the customer.
     *
     * @param coupon coupon will be deleted.
     */
    @Override
    public void deleteCouponPurchase(int customerId,Coupon coupon) throws CustomerException {
        System.out.println("Deleting purchase of a coupon... ");
        Customer customer = customerRepository.findById(customerId).get();
            for (Coupon checkedCoupon : customer.getCoupons()) {
                if (checkedCoupon.getId() == coupon.getId()) {
                    customer.getCoupons().remove(checkedCoupon);
                    customerRepository.saveAndFlush(customer);
                    coupon.setAmount(coupon.getAmount() + 1);
                    couponRepository.saveAndFlush(coupon);
                    System.out.println("The coupon with ID: " + coupon.getId() + " deleted from customer id " + customerId + " coupons list");
                    return;
                }
            }
            throw new CustomerException("This coupon has not been purchased by you!\n");
    }

    /**
     * The method uses the getAllCouponsOfCustomer from customerDBDAO.
     *
     * @return an arrayList of all the coupons of customer.
     */
    @Override
    public List<Coupon> getCustomerCoupons(int customerId) {
        return customerRepository.findById(customerId).get().getCoupons();
    }

    /**
     * The method receive specific category and return all the coupons of customer by this category.
     *
     * @param category - Coupons category id.
     * @return an arrayList of all the relevant coupons.
     */
    @Override
    public List<Coupon> getCustomerCoupons(int customerId, Category category) {
        return getCustomerCoupons(customerId).stream().filter(coupon -> coupon.getCategory().equals(category)).collect(Collectors.toList());
    }


    /**
     * The method receive a maximum price and return all the coupons of customer by this maximum price/ .
     *
     * @param maxPrice - Price limit of the coupons will be displayed
     * @return an arrayList of all the relevant coupons.
    @Override
    */
    public List<Coupon> getCustomerCoupons(int customerId, double maxPrice) {
        return getCustomerCoupons(customerId).stream().filter(coupon -> coupon.getPrice() <= maxPrice).collect(Collectors.toList());
    }

    /**
     * The method will be display the customer details.
     *
     * @return customer details.
     */
    @Override
    public Customer getCustomerDetails(int customerId) {
        return customerRepository.findById(customerId).get();
    }


}
