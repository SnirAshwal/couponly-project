import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CategoryList } from "../../models/coupon";
import "./Coupons.css";
import Coupon from "../Coupon/Coupon";
import globals from "../../utils/Globals";
import coupon from "../../models/coupon";
import { addNotification } from "../../utils/Notification";
import { store } from "../../redux/store";

function Coupons(): JSX.Element {
  const location = useLocation();
  const { category }: any = location.state;

  const getAllCouponsUrl =
    category === undefined
      ? globals.urls.guest.getAllCoupons
      : globals.urls.guest.getAllCouponsByCategory +
        CategoryList[category].value;

  const [coupons, setCoupons] = useState([]);

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
    axios.get(getAllCouponsUrl).then((response) => {
      setCoupons(response.data);
    });
  }, [getAllCouponsUrl]);

  return (
    <div className="Coupons">
      <div className="container">
        {category === undefined ? (
          <div className="coupons-title">ALL COUPONS</div>
        ) : (
          <div className="coupons-title">{CategoryList[category].value}</div>
        )}
        <div className="coupons-container">
          {coupons.map((coupon: coupon) => {
            return (
              <Coupon
                key={coupon.id}
                coupon={coupon}
                couponPurchase={couponPurchase}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Coupons;
