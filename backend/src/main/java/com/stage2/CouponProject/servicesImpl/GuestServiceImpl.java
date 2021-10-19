package com.stage2.CouponProject.servicesImpl;

import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.models.Category;
import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.models.Customer;
import com.stage2.CouponProject.models.User;
import com.stage2.CouponProject.repositories.CouponRepository;
import com.stage2.CouponProject.repositories.CustomerRepository;
import com.stage2.CouponProject.repositories.UserRepository;
import com.stage2.CouponProject.security.ApplicationUserRole;
import com.stage2.CouponProject.services.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Guest service impl class represent all the methods of the guest in our website.
 */
@Service
@RequiredArgsConstructor
public class GuestServiceImpl implements GuestService {

    /**
     * Initialize couponRepository object by using required args constructor
     */
    private final CouponRepository couponRepository;
    /**
     * Initialize customerRepository object by using required args constructor
     */
    private final CustomerRepository customerRepository;
    /**
     * Initialize userRepository object by using required args constructor
     */
    private final UserRepository userRepository;

    /**
     * Add customer method = Register for the guest.
     *
     * @param customer object will be saved in the database.
     * @throws CustomerException will be throw if the email already exists in the database.
     */
    @Override
    public void addCustomer(Customer customer) throws CustomerException {
        System.out.println("\nAdding a customer to the database...");
            if (customerRepository.existsCustomerByEmail(customer.getEmail())) {
                throw new CustomerException("The email: \"" + customer.getEmail() + "\" already exists in the data base.");
            }
            System.out.printf("Adding succeed:\nCustomer \"%s\" has been added successfully\n", customer.getFirstName());
        userRepository.save(new User(customer.getEmail(), customer.getPassword(), ApplicationUserRole.CUSTOMER));
        customer.setId(userRepository.findByEmail(customer.getEmail()).getId());
        customerRepository.save(customer);
    }

    /**
     * This method will show all the coupons in the database.
     * @return list of all the coupons.
     */
    @Override
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }


    /**
     * This method help us to filter the coupons by category.
     * @param category of the coupons will be shown.
     * @return list of coupons by the specific category.
     */
    @Override
    public List<Coupon> getAllCouponsByCategory(Category category) {
        return couponRepository.findByCategory(category);
    }

    /**
     * This method help us to filter the coupons by maxPrice.
     * @param maxPrice of the coupons will be shown
     * @return list of coupons are filtered by max price.
     */
    @Override
    public List<Coupon> getAllCouponByMaxPrice(double maxPrice) {
        return couponRepository.findByPrice(maxPrice);
    }

    /**
     * Get all the coupons by the start date.
     * @return list of the relevant coupons.
     */
    @Override
    public List<Coupon> getAllCouponsByStartDate() {
        return couponRepository.findByOrderByStartDateDesc();
    }

    /**
     * Sort the coupons by their popularity
     * @return sorted list of the most popular coupons.
     */
    @Override
    public List<Coupon> getAllCouponsByPopularity() {
        Map<Integer, Integer> couponsPopularityMap = new HashMap<Integer, Integer>();
        for (int i : couponRepository.findByPopularity()) {
            Integer j = couponsPopularityMap.get(i);
            couponsPopularityMap.put(i, (j == null) ? 1 : j + 1);
        }

        // Create a list from elements of HashMap
        List<Map.Entry<Integer, Integer> > list =
                new LinkedList<Map.Entry<Integer, Integer> >(couponsPopularityMap.entrySet());

        // Sort the list
        list.sort(new Comparator<Map.Entry<Integer, Integer>>() {
            public int compare(Map.Entry<Integer, Integer> o1,
                               Map.Entry<Integer, Integer> o2) {
                return (o2.getValue()).compareTo(o1.getValue());
            }
        });

        // put data from sorted list to hashmap
        HashMap<Integer, Integer> couponsPopularityMapSorted = new LinkedHashMap<Integer, Integer>();
        for (Map.Entry<Integer, Integer> aa : list) {
            couponsPopularityMapSorted.put(aa.getKey(), aa.getValue());
        }

        // put coupons in list from hashmap data
        List<Coupon> popularCoupons = new ArrayList<>();
        for (int id : couponsPopularityMapSorted.keySet()){
            popularCoupons.add(couponRepository.findById(id).get());
        }
        return popularCoupons;
    }

    /**
     * Get all coupons that contains the search word.
     * @param searchWord that the user search for.
     * @return list of the filtered coupons.
     */
    @Override
    public List<Coupon> getAllCouponsBySearchWordInTitle(String searchWord) {
        return couponRepository.findByTitleContaining(searchWord);
    }
}
