import "./MainCoupons.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import Coupon from "../Coupon/Coupon";
import coupon from "../../models/coupon";
import globals from "../../utils/Globals";
import { addNotification } from "../../utils/Notification";
import { store } from "../../redux/store";

function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

interface MainCouponsProps {
  type: "popular" | "date";
  background: "white-coupon" | "no-background";
}

function MainCoupons(props: MainCouponsProps): JSX.Element {
  const [coupons, setCoupons] = useState([]);
  const [index, setIndex] = useState(0);
  const [couponI, setCouponI] = useState(0);
  const couponsLength = 12;

  const size = useWindowSize();
  let CouponsToShow = size < 1050 ? 2 : 4;

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
      .get(
        props.type === "date"
          ? globals.urls.guest.getAllCouponsByDate
          : globals.urls.guest.getAllCouponsByPopularity
      )
      .then((response) => {
        setCoupons(response.data.slice(0, couponsLength));
      })
      .catch((error) => {});
    const lastIndex = coupons.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, coupons, props.type]);

  return (
    <div
      className={`slider ${
        props.background === "white-coupon" && "slider-white-coupon-bg"
      }`}
    >
      <div
        className={`main-coupons-title ${
          props.background === "white-coupon" && "main-coupons-title-white-bg"
        }`}
      >
        {props.type === "popular"
          ? "MOST POPULAR COUPONS"
          : "LAST ADDED COUPONS"}
      </div>
      <button
        className="prev"
        onClick={() => {
          setIndex(index - 1);
          setCouponI((couponI - CouponsToShow + couponsLength) % couponsLength);
        }}
      >
        <IoIosArrowBack size={60} />
      </button>
      <section className="section">
        {coupons.map((coupon: any, couponIndex: any) => {
          const { id } = coupon;

          let position = "nextSlide";
          if (couponIndex === index) {
            position = "activeSlide";
          }
          if (
            couponIndex === index - 1 ||
            (index === 0 && couponIndex === coupons.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={`${position} coupon-container`} key={id}>
              {coupons
                .slice(couponI, couponI + CouponsToShow)
                .map((coupon, index) => {
                  return (
                    <Coupon
                      key={index}
                      couponPurchase={couponPurchase}
                      coupon={coupon}
                    />
                  );
                })}
            </article>
          );
        })}
      </section>
      <button
        className="next"
        onClick={() => {
          setIndex(index + 1);
          setCouponI((couponI + CouponsToShow) % couponsLength);
        }}
      >
        <IoIosArrowForward size={60} />
      </button>
    </div>
  );
}

export default MainCoupons;
