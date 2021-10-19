import "./Navbar.css";
import { FaUser, FaWeightHanging, FaSearch } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { TiThMenu } from "react-icons/ti";
import logo from "../../assets/GraphicElements/Navbar/Couponly.png";
import pageLine from "../../assets/GraphicElements/Navbar/BoundaryLine.png";
import { NavLink, useHistory } from "react-router-dom";
import { couponsData } from "./navbarCouponsData";
import { Link } from "react-scroll";
import { store } from "../../redux/store";
import { logoutUser } from "../../redux/authState";
import { useContext, useEffect, useState } from "react";
import Login from "../Login/Login";
import { store as notificationStore } from "react-notifications-component";
import { ImCancelCircle } from "react-icons/im";
import Coupon from "../../models/coupon";
import axios from "axios";
import globals from "../../utils/Globals";
import { CartActionType, CartContext } from "../../Contexts/CartContext";
import { addNotification } from "../../utils/Notification";
import PurchaseModal from "../PurchaseModal/PurchaseModal";
import { BiSearchAlt } from "react-icons/bi";
import { LoginActionType, LoginContext } from "../../Contexts/LoginContext";
import localStorage from "redux-persist/es/storage";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import ExpirationTokenModal from "../ExpirationTokenModal/ExpirationTokenModal";

let startInterval: NodeJS.Timeout | null = null;

function Navbar(): JSX.Element {
  const tokenExpiration = useSelector(
    (state: any) => state.authState.loginUser.token
  );
  const [showExpirationTokenModal, setShowExpirationTokenModal] =
    useState(false);
  const { cartState, cartDispatch } = useContext(CartContext);
  const { LoginState, LoginDispatch } = useContext(LoginContext);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [searchData, setSearchData] = useState("");

  if ("JWT_TOKEN" in window.localStorage) {
    if (
      !("TIMER" in window.localStorage) ||
      startInterval === null ||
      startInterval !== null
    ) {
      if (startInterval !== null) {
        clearInterval(startInterval);
      }
      const expiration =
        JSON.parse(JSON.stringify(jwtDecode(tokenExpiration))).exp * 1000;

      startInterval = setInterval(() => {
        handleLogout();
        setShowExpirationTokenModal(true);
      }, expiration - new Date().getTime());
      localStorage.setItem("TIMER", JSON.stringify(startInterval));
    }
  }

  const history = useHistory();

  const handleLogout = () => {
    clearInterval(
      startInterval !== null ? startInterval : setInterval(() => {}, 0)
    );
    localStorage.removeItem("TIMER");
    store.dispatch(logoutUser());
    cartDispatch({ type: CartActionType.DELETE_CART, payload: null });
    addNotification(
      "Logout Successfully",
      "Goodbye",
      "danger",
      "top",
      "top-right",
      160,
      ["animate__animated", "animate__fadeInRight"],
      ["animate__animated", "animate__fadeOutRight"],
      {
        duration: 1500,
      }
    );
    history.push("/");
  };

  const removeCouponFromCart = (coupon: Coupon) => {
    cartDispatch({ type: CartActionType.REMOVE_FROM_CART, payload: coupon });
  };

  const handleCartCheckout = () => {
    cartState.coupons.forEach((coupon) => {
      axios
        .post<string>(
          globals.urls.customer.customer +
            store.getState().authState.loginUser.id +
            "/purchaseCoupon",
          coupon
        )
        .then((response) => {
          cartDispatch({
            type: CartActionType.REMOVE_FROM_CART,
            payload: coupon,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
    notificationStore.addNotification({
      title: "ALL THE COUPONS HAVE BEEN PURCHASED SUCCESSFULLY",
      message: "Thank You!",
      type: "success",
      insert: "top",
      container: "center",
      width: 160,
      animationIn: ["animate__animated", "animate__fadeInDown"],
      animationOut: ["animate__animated", "animate__fadeOutUp"],
      dismiss: {
        duration: 1500,
      },
    });
  };

  useEffect(() => {}, [tokenExpiration]);

  return (
    <div
      style={{
        backgroundColor: "rgb(231, 229, 229)",
      }}
    >
      <div className="Navbar">
        <NavLink exact to="/" className="nav-item">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <ul className="navbar-list">
          <li>
            <NavLink exact to="/" className="nav-item">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <div className="dropdown">
              <NavLink
                style={{ textDecoration: "none" }}
                className="nav-icon"
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: undefined,
                  },
                }}
              >
                Coupons
                <VscTriangleDown style={{ paddingLeft: "0.5em" }} size={20} />
              </NavLink>
              <div className="dropdown-content coupons-dropdown">
                {couponsData.map((coupon) => {
                  const { id, pathname, category, name } = coupon;
                  return (
                    <NavLink
                      className="nav-icon"
                      key={id}
                      exact
                      to={{
                        pathname: pathname,
                        state: {
                          category: category,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      {name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </li>
          <li>
            <Link
              activeClass="active"
              to="contact-us"
              onClick={() => history.push("/")}
              className="nav-item"
            >
              Contact-Us
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="about-us"
              onClick={() => history.push("/")}
              className="nav-item"
            >
              About-Us
            </Link>
          </li>
        </ul>
        <div className="nav-icons-container">
          <div className="icons-container">
            <div className="dropdown">
              <TiThMenu className="flex-menu-icon nav-icon"></TiThMenu>
              <div className="dropdown-content">
                <NavLink exact to="/" className="nav-icon">
                  Home
                </NavLink>
                <NavLink
                  className="nav-icon"
                  exact
                  to={{
                    pathname: "/coupons",
                    state: {
                      category: undefined,
                    },
                  }}
                >
                  Coupons
                </NavLink>
                <Link
                  activeClass="active"
                  to="about-us"
                  onClick={() => history.push("/")}
                  className="nav-icon"
                >
                  About-Us
                </Link>
                <Link
                  activeClass="active"
                  to="contact-us"
                  onClick={() => history.push("/")}
                  className="nav-icon"
                >
                  Contact-Us
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <FaUser className="nav-icon"></FaUser>
              <div className="dropdown-content">
                {/* LoginState.loggedIn */}
                {store.getState().authState.loginUser.token !== "" ? (
                  <div>
                    <NavLink className="nav-icon" exact to="/dashboard">
                      Dashboard
                    </NavLink>
                    <button
                      className="nav-icon"
                      onClick={handleLogout}
                      style={{ border: "none", padding: "0.8em" }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      LoginDispatch({
                        type: LoginActionType.SHOW_LOGIN_MODAL,
                        payload: true,
                      })
                    }
                    style={{ border: "none", padding: "0.8em" }}
                  >
                    Login | Register
                  </button>
                )}
              </div>
            </div>
            <div className="dropdown">
              <FaWeightHanging className="nav-icon" />
              {cartState.coupons.length > 0 && (
                <div className="cart-num-items">{cartState.coupons.length}</div>
              )}
              <div className="dropdown-content cart-dropdown-content">
                {cartState.coupons.map((coupon: any, index) => {
                  const { title, image } = coupon;
                  return (
                    <div className="cart-item" key={index}>
                      <img
                        src={image}
                        alt="coupon-img"
                        className={`cart-item-img ${
                          index === 0 && "first-cart-item-img"
                        }`}
                      />
                      <div className="cart-item-text">{title}</div>
                      <button
                        className={`cart-cancel-btn ${
                          index === 0 && "first-cart-cancel-btn"
                        }`}
                        onClick={() => removeCouponFromCart(coupon)}
                      >
                        <ImCancelCircle size={20} />
                      </button>
                    </div>
                  );
                })}
                {store.getState().authState.loginUser.token === "" &&
                cartState.coupons.length !== 0 ? (
                  <button
                    onClick={() => ({
                      type: LoginActionType.SHOW_LOGIN_MODAL,
                      payload: true,
                    })}
                    className="checkout-btn"
                  >
                    Login
                  </button>
                ) : cartState.coupons.length !== 0 ? (
                  <button
                    style={{ border: "none", padding: "0.8em" }}
                    className="checkout-btn"
                    onClick={() => {
                      setShowPurchaseModal(true);
                    }}
                  >
                    Checkout
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="dropdown">
              <FaSearch className="nav-icon" />
              <div className="dropdown-content search-dropdown-content">
                <div className="search-container">
                  <form
                    className="search-form"
                    onChange={(e) =>
                      setSearchData((e.target as HTMLInputElement).value)
                    }
                  >
                    <input type="text" className="search-input" />
                    <NavLink
                      exact
                      to={{
                        pathname: "/search",
                        state: {
                          searchData: searchData,
                        },
                      }}
                      className="search-btn"
                    >
                      <BiSearchAlt size={20} />
                    </NavLink>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={pageLine}
        alt="pageLine"
        style={{
          width: "100%",
          marginBottom: "-1em",
          minHeight: "5px",
          boxShadow: " rgba(0, 0, 0, 0.06) 0px 4px 6px -1px, 0px 2px 4px -1px",
        }}
      />
      {showExpirationTokenModal && (
        <ExpirationTokenModal
          setExpirationTokenModal={setShowExpirationTokenModal}
        />
      )}
      {LoginState.showLoginModal && <Login />}
      {showPurchaseModal && (
        <PurchaseModal
          setModalShow={setShowPurchaseModal}
          CouponPurchase={handleCartCheckout}
          message="Are you sure you want to checkout?"
        ></PurchaseModal>
      )}
    </div>
  );
}

export default Navbar;
