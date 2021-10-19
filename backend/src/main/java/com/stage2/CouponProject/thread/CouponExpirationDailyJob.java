package com.stage2.CouponProject.thread;


import com.stage2.CouponProject.models.Coupon;
import com.stage2.CouponProject.repositories.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

/**
 * this class contains what need to be done in the coupon system daily task
 * it contains the method that go through all the coupons in the data base and deletes them if they expired
 * it also deletes all the records of purchases from customers of the same coupons.
 * We use scheduled annotation to make sure that this specific task will run at specific time.
 */
@Service
@EnableAsync
@EnableScheduling
@RequiredArgsConstructor
public class CouponExpirationDailyJob {

    /**
     * This field help us to get access for delete coupon method from coupon repository interface.
     */
    private final CouponRepository couponRepository;

    /**
     * This method runs every 30 seconds and will delete the expired coupons and their purchase history by the customers.
     */
    @Async
    @Scheduled(cron = "0 0 * * * ?", zone = "Asia/Jerusalem")
    public void DailyJob() {
            List<Coupon> expiredCoupons = couponRepository.findByEndDateBefore(new Date(System.currentTimeMillis()));
            expiredCoupons.forEach(coupon -> {
                couponRepository.deleteById(coupon.getId());
                System.out.println(("Coupon with ID: " + coupon.getId() + " has expired" + "\nCoupon with ID: " + coupon.getId() + " has been deleted successfully."));
            });
        }
    }
