package com.stage2.CouponProject.CLR;

import com.stage2.CouponProject.models.*;
import com.stage2.CouponProject.repositories.UserRepository;
import com.stage2.CouponProject.security.ApplicationUserRole;
import com.stage2.CouponProject.servicesImpl.AdminServiceImpl;
import com.stage2.CouponProject.servicesImpl.CompanyServiceImpl;
import com.stage2.CouponProject.servicesImpl.GuestServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.ArrayList;

/**
 *This class initialize our coupon system with companies, customers and coupons.
 */
@Component
@RequiredArgsConstructor
public class AppStarter implements CommandLineRunner {
    /**
     * Initialize userRepository object by using required args constructor
     */
    private final UserRepository userRepository;
    /**
     * Initialize adminService object by using required args constructor
     */
    private final AdminServiceImpl adminService;
    /**
     * Initialize companyService object by using required args constructor
     */
    private final CompanyServiceImpl companyService;

    @Override
    public void run(String... args) throws Exception {
        userRepository.save(new User( "admin@admin.com", "admin", ApplicationUserRole.ADMIN));
        adminService.addCompany(new Company("FoodCompany", "Food@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCompany(new Company("VacationCompany", "Vacation@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCompany(new Company("DecorCompany", "Decor@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCompany(new Company("ElectronicsCompany", "Electronics@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCompany(new Company("FashionCompany", "Fashion@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCompany(new Company("BeautyCompany", "Beauty@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCompany(new Company("AttractionCompany", "Attraction@gmail.com", "12345678", new ArrayList<>()));

        adminService.addCustomer(new Customer("Ori", "Erez Blu", "orierezblu@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCustomer(new Customer("Snir", "Ashwal", "snirashwal@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCustomer(new Customer("Dani", "Macluf", "danimacluf@gmail.com", "12345678", new ArrayList<>()));
        adminService.addCustomer(new Customer("Dor", "Kalfon", "dorkalfon@gmail.com", "12345678", new ArrayList<>()));


        //FoodCoupons:
        companyService.addCoupon( new Coupon(1,"Breakfast at `Landver Coffee`" , Category.FOOD , "A sumptuous breakfast at Landover Cafe at an amazing price" ,Date.valueOf("2021-10-05"), Date.valueOf("2021-12-29") ,100 , 12,  "https://www.landwercafe.co.il/wp-content/uploads/2020/01/%D7%91%D7%95%D7%A7%D7%A8-%D7%99%D7%97%D7%99%D7%93.jpg"));
        companyService.addCoupon( new Coupon(1,"Business meal at Vitrina Burger" , Category.FOOD , "Hamburger, fries and drinks for only $ 14 " ,Date.valueOf("2021-10-04"), Date.valueOf("2021-12-15") ,200 , 15,  "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"));
        companyService.addCoupon( new Coupon(1,"Buy one pizza and get the other for free at Domino`s Pizza" , Category.FOOD , "Domino's Pizza offers an amazing coupon for a limited time. Buy one pizza and get the other one for free for only $ 19." ,Date.valueOf("2021-10-01"), Date.valueOf("2021-12-13") ,500 , 19,  "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"));
        companyService.addCoupon( new Coupon(1,"Refilled Hummus meal at the \"Hummus Eliyahu\" restaurant chain" , Category.FOOD , "The meal includes Hummus, drinks and chips at an amazing price." ,Date.valueOf("2021-09-25"), Date.valueOf("2021-11-15") ,50 , 10,  "https://www.humus-eli-yahoo.com/wp/wp-content/uploads/2020/09/hummus-elyahoo-a.jpg"));

        //VacationCoupons:
        companyService.addCoupon( new Coupon(2,"Overnight at a boutique hotel in Tel Aviv" , Category.VACATION , "Overnight at Rothschild Hotel 22 at an amazing price.\n" + "The coupon is not valid on weekends" ,Date.valueOf("2021-09-27"), Date.valueOf("2021-12-14") ,75 , 180,  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/b0/38/2f/rotshild-traklin-dpi.jpg?w=600&h=300&s=1"));
        companyService.addCoupon( new Coupon(2,"4 Nights in London , England" , Category.VACATION , "Four nights at a five star hotel in London. The deal includes flight, accommodation and luggage transport.  " ,Date.valueOf("2021-09-05"), Date.valueOf("2021-09-25") ,60 , 700,  "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"));
        companyService.addCoupon( new Coupon(2,"Two nights at the Royal Beach Hotel, Eilat." , Category.VACATION , "Two nights at the Royal Beach Hotel, Eilat.\n" + "Half board, can be upgraded to \"all inclusive\" for an additional $ 100 per night.\n" + "The coupon is not valid on weekends.  " ,Date.valueOf("2021-10-02"), Date.valueOf("2021-11-20") ,90 , 400,  "https://pix8.agoda.net/hotelImages/461637/0/0ebfa7a2f420e53bd2cde901b60dc4ae.jpg?s=1024x768"));
        companyService.addCoupon( new Coupon(2,"Overnight at a \"Elma Hotel\" ,including a spa." , Category.VACATION , "Overnight at the Alma Hotel, Zichron Yaacov.\n" + "The coupon includes a spa, half-board meals.\n" + "The coupon can be used on weekends" ,Date.valueOf("2021-10-01"), Date.valueOf("2021-12-15") ,50 , 250,  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/44746481.jpg?k=8b50dc85f3fda1400ad5ec103aa0a9f10ff69385502ed44a82e92b91cecbd9bc&o=&hp=1"));


        //BeautyCoupons:
        companyService.addCoupon( new Coupon(3,"Spa at the Herods Hotel for half price" , Category.BEAUTY , "Spa at the Herods Hotel for half price.\n" + "Only two coupons can be purchased.\n" + "Can not be used on weekends" ,Date.valueOf("2021-09-23"), Date.valueOf("2021-11-12") ,100 , 40,  "https://sharespa.co.il/wp-content/uploads/2019/07/%D7%94%D7%A8%D7%95%D7%93%D7%A1-%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91-7.jpg"));
        companyService.addCoupon( new Coupon(3,"25% discount for facial treatment at the beautician \"Ora Losh\"" , Category.BEAUTY , "25% discount for facials.\n" + "The treatment lasts about an hour. Only one coupon can be purchased" ,Date.valueOf("2021-10-01"), Date.valueOf("2021-11-15") ,100 , 30,  "https://images.pexels.com/photos/2253832/pexels-photo-2253832.jpeg?cs=srgb&dl=pexels-emma-bauso-2253832.jpg&fm=jpg"));
        companyService.addCoupon( new Coupon(3,"Feet treatment at the spa at half price." , Category.BEAUTY , "Foot treatment at the spa 7. The treatment lasts half an hour. You can only buy one coupon." ,Date.valueOf("2021-10-22"), Date.valueOf("2021-12-12") ,100 , 30,  "https://images.pexels.com/photos/5240677/pexels-photo-5240677.jpeg?cs=srgb&dl=pexels-anete-lusina-5240677.jpg&fm=jpg"));
        companyService.addCoupon( new Coupon(3,"Pedicure treatment in the Lak4U network at an amazing price." , Category.BEAUTY , "LAK4U offer an amazing deal for a limited time.\n" + "Only one coupon can be purchased." ,Date.valueOf("2021-10-01"), Date.valueOf("2021-11-18") ,75 , 10,  "https://images.pexels.com/photos/332046/pexels-photo-332046.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"));


        //ElectronicsCoupons:
        companyService.addCoupon( new Coupon(4,"Dyson V10 absolute vacuum cleaner" , Category.ELECTRICITY , "Extremely quiet Dyson vacuum cleaner that allows thorough cleaning anywhere. Includes two-year warranty and floor stand." ,Date.valueOf("2021-10-02"), Date.valueOf("2022-01-12") ,50 , 300,  "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/ownerspecific/226364-01.png?$responsive$&fmt=png-alpha&cropPathE=desktop&fit=stretch,1&wid=1920"));
        companyService.addCoupon( new Coupon(4,"BOSCH 8 kg washing machine" , Category.ELECTRICITY , "BOSCH WAN2427MPL washing machine with a volume of 8 kg with a speed of 1000 rpm, energy rating A and one year warranty." ,Date.valueOf("2021-10-04"), Date.valueOf("2022-01-15") ,25 , 400,  "https://www.vieffetrade.eu/shop/foto_articoli/Bosch/515282/515282.jpg"));
        companyService.addCoupon( new Coupon(4,"Mixer with a 5 liter La Kitchenette bowl" , Category.ELECTRICITY , "1,000W mixer with 7 speeds and a variety of accessories: kneading hook, whisk, guitar hook and more. Includes one year warranty.." ,Date.valueOf("2021-10-04"), Date.valueOf("2022-01-20") ,30 , 180,  "https://cdn.baligam.co.il/_media/media/59324/419625.jpg"));
        companyService.addCoupon( new Coupon(4,"LG Smart 4K TV, 75-inch screen" , Category.ELECTRICITY , "75-inch smart LG TV with IPS panel, smart remote and voice control. Includes one year warranty." ,Date.valueOf("2021-10-06"), Date.valueOf("2022-02-02") ,100 , 1500,  "https://www.lg.com/us/images/tvs/md07000421/gallery/medium01.jpg"));


        //DecorCoupons:
        companyService.addCoupon( new Coupon(5,"Bedroom dresser" , Category.DECOR , "Almeria white side dresser with two large ones that move on rails starting at 70 NIS" ,Date.valueOf("2021-10-01"), Date.valueOf("2021-12-14") ,100 , 70,  "https://cdn.baligam.co.il/_media/media/39932/454329.jpg"));
        companyService.addCoupon( new Coupon(5,"Garden seating area" , Category.DECOR , "A courtyard seating set made of solid pine wood, and includes a double sofa, 2 armchairs and a coffee table for $ 400" ,Date.valueOf("2021-09-15"), Date.valueOf("2021-11-28") ,10 , 400,  "https://cdn.baligam.co.il/_media/media/59347/419749.jpg"));
        companyService.addCoupon( new Coupon(5,"Bed and a half width RAM DESIGN model Eliana1" , Category.DECOR , "A bed and a half wide with a microfiber fabric upholstery that repels liquids in a wide range of colors. Includes one year warranty." ,Date.valueOf("2021-10-05"), Date.valueOf("2021-02-12") ,50 , 300,  "https://cdn.baligam.co.il/_media/media/32033/286931.jpg"));
        companyService.addCoupon( new Coupon(5,"A hammock for the house" , Category.DECOR , "100% cotton hammock in a rounded design" ,Date.valueOf("2021-10-03"), Date.valueOf("2021-11-12") ,100 , 40,  "https://cdn.baligam.co.il/_media/media/32795/332869.jpg"));

        //FashionCoupons:
        companyService.addCoupon( new Coupon(6,"Columbia Men's Coat" , Category.FASHION , "Columbia men's jacket, model Ascender Softshell, windproof and water-repellent" ,Date.valueOf("2021-09-15"), Date.valueOf("2021-11-18") ,100 , 99,  "https://cdn.baligam.co.il/_media/media/36268/310674.jpg"));
        companyService.addCoupon( new Coupon(6,"Gold circle bracelet" , Category.FASHION , "A wide bracelet in the shape of circles made of 24k gold plating" ,Date.valueOf("2021-09-25"), Date.valueOf("2021-11-25") ,50 , 39.9,  "https://cdn.baligam.co.il/_media/media/43008/349239.jpg"));
        companyService.addCoupon( new Coupon(6,"Pack of 4 T-shirts for men Delta" , Category.FASHION , "A quartet of T-shirts or jerseys for men made of 100% cotton in white, from the MATCHTONIM series by Delta" ,Date.valueOf("2021-10-01"), Date.valueOf("2021-11-30") ,500 , 15,  "https://cdn.baligam.co.il/_media/media/43713/351665.jpg"));
        companyService.addCoupon( new Coupon(6,"Hoop earrings combined with a spiral" , Category.FASHION , "Hoop earrings are made of gold filled with a spiral made of 24K gold plating" ,Date.valueOf("2021-10-03"), Date.valueOf("2021-11-18") ,100 , 30,  "https://cdn.baligam.co.il/_media/media/42926/349132.jpg"));


        //AttractionCoupons:
        companyService.addCoupon( new Coupon(7,"Flight in Bekai with fly up, Shefayim-Gaash and Latrun" , Category.ATTRACTIONS , "Take Extreme to Extreme! Flying ATV Flight Experience" ,Date.valueOf("2021-09-15"), Date.valueOf("2021-11-18") ,100 , 99,  "https://cdn.baligam.co.il/_media/media/35165/tags/269/346617.jpg"));
        companyService.addCoupon( new Coupon(7,"Double cruise on a yacht with wine and a meal, Marina Herzliya" , Category.ATTRACTIONS , "Whip on it: A pampering double cruise in the Herzliya Marina that includes a meal, a bottle of wine and unlimited hot and cold drinks" ,Date.valueOf("2021-10-05"), Date.valueOf("2021-11-30") ,50 , 200,  "https://cdn.baligam.co.il/_media/media/65356/444029.jpg"));
        companyService.addCoupon( new Coupon(7,"Double horseback riding trip, Ein Vered riding club" , Category.ATTRACTIONS , "Horses between the orchards: A double riding trip in Ein Vered" ,Date.valueOf("2021-10-05"), Date.valueOf("2021-11-24") ,100 , 50,  "https://cdn.baligam.co.il/_media/media/46879/366842.jpg"));
        companyService.addCoupon( new Coupon(7,"Flying a plane accompanied by a guide with iFly" , Category.ATTRACTIONS , "Fly and enjoy: Training and flying an airplane accompanied by a guide with iFly together or alone" ,Date.valueOf("2021-10-03"), Date.valueOf("2021-04-24") ,100 , 50,  "https://cdn.baligam.co.il/_media/media/63888/tags/269/437535.jpg"));

    }
}
