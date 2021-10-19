import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import globals from "../../utils/Globals";
import Coupon from "../Coupon/Coupon";
import coupon from "../../models/coupon";
import { BiSearchAlt } from "react-icons/bi";
import "./Search.css";
import { addNotification } from "../../utils/Notification";
import { store } from "../../redux/store";

function Search(): JSX.Element {
  const location = useLocation();
  const { searchData }: any = location.state;
  const [searchCoupons, setSearchCoupons] = useState([]);

  const couponPurchase = (coupon: coupon) => {
    axios
      .post<string>(
        globals.urls.customer.customer +
          store.getState().authState.loginUser.id +
          "/purchaseCoupon",
        coupon
      )
      .then((response) => {
        addNotification(
          "Congratulations!",
          "Coupon has been purchased succesfully",
          "success",
          "top",
          "center",
          160,
          ["animate__animated", "animate__fadeInDown"],
          ["animate__animated", "animate__fadeOutUp"],
          {
            duration: 1500,
          }
        );
      })
      .catch((error) => {
        addNotification(
          "Error",
          error.response.data.description,
          "danger",
          "top",
          "center",
          160,
          ["animate__animated", "animate__fadeInDown"],
          ["animate__animated", "animate__fadeOutUp"],
          {
            duration: 1500,
          }
        );
      });
  };

  useEffect(() => {
    axios
      .get(globals.urls.guest.getAllCouponsBySearchWordInTitle + searchData)
      .then((response) => {
        setSearchCoupons(response.data);
      });
  }, [searchData]);

  return (
    <div className="Search">
      <h1>
        SEARCH <BiSearchAlt />
      </h1>
      <div className="searched-coupons">
        {searchCoupons.length === 0 ? (
          <div className="unmatched-search-section">
            Unfortunately we did not find any results matching this search
          </div>
        ) : (
          <div className="coupons-container">
            {searchCoupons.map((coupon: coupon) => {
              return (
                <Coupon
                  key={coupon.id}
                  couponPurchase={couponPurchase}
                  coupon={coupon}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default Search;
