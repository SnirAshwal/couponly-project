import { FaWeightHanging } from "react-icons/fa";
import { store } from "../../redux/store";
import "./Coupon.css";
import coupon from "../../models/coupon";
import axios from "axios";
import globals from "../../utils/Globals";
import { useContext } from "react";
import { CartActionType, CartContext } from "../../Contexts/CartContext";
import { addNotification } from "../../utils/Notification";
import { LoginActionType, LoginContext } from "../../Contexts/LoginContext";
import { NavLink } from "react-router-dom";

interface CouponProps {
  coupon: coupon;
  couponPurchase: Function;
}

function Coupon(props: CouponProps): JSX.Element {
  const { cartState, cartDispatch } = useContext(CartContext);
  const { LoginDispatch } = useContext(LoginContext);

  const {
    id,
    companyId,
    category,
    startDate,
    endDate,
    image,
    amount,
    title,
    description,
    price,
  } = props.coupon;

  const checkUserTypeBeforeAction = (actionType: "addToCart") => {
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
        const newCoupon = new coupon();
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

  return (
    <div className="coupon-section">
      <div className="image-section">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="coupon-img"
        >
          <div className="coupon-amount">{amount} Coupons Left</div>
        </div>
      </div>
      <div className="details-section">
        <h5 className="coupon-title">{title}</h5>
        <div>{description.substring(0, 110)}...</div>
      </div>
      <div className="purchase-section">
        <div className="coupon-price">{price}$</div>
        <NavLink
          exact
          className="coupon-purchase-btn"
          to={{
            pathname: "/couponPage",
            state: {
              coupon: props.coupon,
            },
          }}
        >
          Read More
        </NavLink>
        <button
          className="coupon-purchase-btn cart-btn"
          onClick={() => checkUserTypeBeforeAction("addToCart")}
        >
          <FaWeightHanging />
        </button>
      </div>
    </div>
  );
}

export default Coupon;
