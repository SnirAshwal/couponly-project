import { useLocation } from "react-router";
import Coupon from "../../models/coupon";
import "./CouponPage.css";
import { BsClock } from "react-icons/bs";
import { FaWeightHanging } from "react-icons/fa";
import { useContext, useState } from "react";
import { LoginActionType, LoginContext } from "../../Contexts/LoginContext";
import { addNotification } from "../../utils/Notification";
import { store } from "../../redux/store";
import axios from "axios";
import globals from "../../utils/Globals";
import { CartActionType, CartContext } from "../../Contexts/CartContext";
import PurchaseModal from "../PurchaseModal/PurchaseModal";

function CouponPage(): JSX.Element {
  const { LoginDispatch } = useContext(LoginContext);
  const { cartState, cartDispatch } = useContext(CartContext);
  const [showPurchaseModal, SetshowPurchaseModal] = useState(false);

  const location = useLocation();
  const { coupon }: any = location.state;
  const {
    id,
    companyId,
    title,
    category,
    description,
    startDate,
    endDate,
    amount,
    price,
    image,
  } = coupon;

  const checkUserTypeBeforeAction = (actionType: "purchase" | "addToCart") => {
    if (
      store.getState().authState.loginUser.clientType === "ADMIN" ||
      store.getState().authState.loginUser.clientType === "COMPANY"
    ) {
      addNotification(
        "Error",
        "You can not buy or add coupons to cart from this account",
        "danger",
        "top",
        "center",
        160,
        ["animate__animated", "animate__fadeInDown"],
        ["animate__animated", "animate__fadeOutUp"],
        {
          duration: 3000,
        }
      );
      return;
    }
    if (localStorage["JWT_TOKEN"] === undefined) {
      LoginDispatch({ type: LoginActionType.SHOW_LOGIN_MODAL, payload: true });
      return;
    }
    if (actionType === "purchase") {
      SetshowPurchaseModal(true);
    }
    if (actionType === "addToCart") {
      addToCartFunc();
    }
  };

  const addToCartFunc = () => {
    let couponNeedToBeAdded = true;
    axios
      .get(
        globals.urls.customer.customer +
          store.getState().authState.loginUser.id +
          "/coupons"
      )
      .then((response) => {
        response.data.forEach((coupon: any) => {
          if (coupon.id === id) {
            addNotification(
              "Error",
              "You can only add a coupon that you have not been purchased before to the cart",
              "danger",
              "top",
              "center",
              160,
              ["animate__animated", "animate__fadeInDown"],
              ["animate__animated", "animate__fadeOutUp"],
              {
                duration: 3000,
              }
            );
            couponNeedToBeAdded = false;
          }
        });
        if (!couponNeedToBeAdded) return;
        const newCoupon = new Coupon();
        newCoupon.id = id;
        newCoupon.companyId = companyId;
        newCoupon.category = category;
        newCoupon.title = title;
        newCoupon.description = description;
        newCoupon.startDate = startDate;
        newCoupon.endDate = endDate;
        newCoupon.amount = amount;
        newCoupon.price = price;
        newCoupon.image = image;
        for (let i = 0; i < cartState.coupons.length; i += 1) {
          if (newCoupon.id === cartState.coupons[i].id) {
            couponNeedToBeAdded = false;
            break;
          }
        }
        couponNeedToBeAdded &&
          cartDispatch({
            type: CartActionType.ADD_TO_CART,
            payload: newCoupon,
          });
        addNotification(
          couponNeedToBeAdded
            ? "Coupon Added to cart"
            : "You can only buy 1 from each coupon",
          couponNeedToBeAdded ? "success" : "please choose another one",
          couponNeedToBeAdded ? "success" : "danger",
          "top",
          "center",
          160,
          ["animate__animated", "animate__fadeInDown"],
          ["animate__animated", "animate__fadeOutUp"],
          {
            duration: 3000,
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const couponPurchase = (coupon: Coupon) => {
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

  return (
    <div className="CouponPage">
      <div className="coupon-img-container">
        <div
          className="coupon-img"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="coupon-page-amount">{amount} Coupons Left</div>
      </div>
      <div className="coupon-details-container">
        <div className="coupon-title-description">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <hr />
        <div className="coupon-end-date">
          <BsClock size={40} style={{ marginRight: "1em" }} />
          Expired Date: {endDate}
        </div>
        <hr />
        <div className="coupon-page-purchase-btns">
          <div className="coupon-page-price coupon-page-btn">{price}$</div>
          <button
            className="coupon-purchase-btn coupon-page-btn"
            onClick={() => checkUserTypeBeforeAction("purchase")}
          >
            Buy This Coupon
          </button>
          <button
            className="coupon-purchase-btn cart-btn coupon-page-btn"
            onClick={() => checkUserTypeBeforeAction("addToCart")}
          >
            <FaWeightHanging />
          </button>
        </div>
      </div>
      {showPurchaseModal && (
        <PurchaseModal
          setModalShow={SetshowPurchaseModal}
          couponToBePurchased={coupon}
          CouponPurchase={couponPurchase}
          message="ARE YOU SURE YOU WANT TO BUY THIS COUPON?"
        />
      )}
    </div>
  );
}

export default CouponPage;
