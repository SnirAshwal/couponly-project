import AboutUs from "../AboutUs/AboutUs";
import Categories from "../Categories/Categories";
import ContactUs from "../ContactUs/ContactUs";
import Header from "../Header/Header";
import MainCoupons from "../MainCoupons/MainCoupons";
import "./Main.css";

function Main(): JSX.Element {
  return (
    <div className="Main">
      <Header />
      <Categories />
      <MainCoupons type="popular" background="no-background" />
      <MainCoupons type="date" background="white-coupon" />
      <div id="about-us">
        <AboutUs />
      </div>
      <div className="bg-coupon">
        <ContactUs />
      </div>
    </div>
  );
}

export default Main;
