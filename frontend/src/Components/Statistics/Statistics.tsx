import "./Statistics.css";
import { BsBuilding, BsPerson } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { store } from "../../redux/store";
import axios from "axios";
import globals from "../../utils/Globals";
import { useEffect, useState } from "react";

function Statistics(): JSX.Element {
  //Admin Statistics
  const [numberOfCompanies, setNumberOfCompanies] = useState(0);
  const [numberOfCustomers, setNumberOfCustomers] = useState(0);
  const [numberOfCoupons, setNumberOfCoupons] = useState(0);
  const [numberOfCouponsPurchased, setNumberOfCouponsPurchased] = useState(0);

  //Company Statistics
  const [companyCouponsPurchased, setCompanyCouponsPurchased] = useState(0);
  const [numOfCompanyCoupons, setNumOfCompanyCoupons] = useState(0);

  const fetchNumberOfCompanies = () => {
    axios
      .get(globals.urls.administrator.getNumberOfCompanies)
      .then((response) => {
        setNumberOfCompanies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNumberOfCustomers = () => {
    axios
      .get(globals.urls.administrator.getNumberOfCustomers)
      .then((response) => {
        setNumberOfCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNumberOfCoupons = () => {
    axios
      .get(globals.urls.administrator.getNumberOfCoupons)
      .then((response) => {
        setNumberOfCoupons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNumberOfCouponsPurchased = () => {
    axios
      .get(globals.urls.administrator.getNumberOfCouponsPurchased)
      .then((response) => {
        setNumberOfCouponsPurchased(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCompanyCouponsPurchased = () => {
    axios
      .get(
        globals.urls.company.company +
          store.getState().authState.loginUser.id +
          "/numOfPurchasedCoupons"
      )
      .then((response) => {
        console.log(response.data);
        setCompanyCouponsPurchased(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchNumOfCompanyCoupons = () => {
    axios
      .get(
        globals.urls.company.company +
          store.getState().authState.loginUser.id +
          "/numOfCoupons"
      )
      .then((response) => {
        console.log(response.data);
        setNumOfCompanyCoupons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (store.getState().authState.loginUser.clientType === "ADMIN") {
      fetchNumberOfCompanies();
      fetchNumberOfCustomers();
      fetchNumberOfCoupons();
      fetchNumberOfCouponsPurchased();
    } else {
      fetchCompanyCouponsPurchased();
      fetchNumOfCompanyCoupons();
    }
  }, []);

  return store.getState().authState.loginUser.clientType === "ADMIN" ? (
    <div className="Statistics">
      <div className="statistics-info">
        <BsBuilding size={50} className="statistics-info-logo" />
        <div className="statistics-info-header">Companies in the system:</div>
        <div className="statistics-info-result">{numberOfCompanies}</div>
      </div>
      <div className="statistics-info">
        <BsPerson size={50} className="statistics-info-logo" />
        <div className="statistics-info-header">Customers in the system:</div>
        <div className="statistics-info-result">{numberOfCustomers}</div>
      </div>
      <div className="statistics-info">
        <HiOutlineTicket size={50} className="statistics-info-logo" />
        <div className="statistics-info-header">Coupons in the system:</div>
        <div className="statistics-info-result">{numberOfCoupons}</div>
      </div>
      <div className="statistics-info">
        <BiPurchaseTagAlt size={50} className="statistics-info-logo" />
        <div className="statistics-info-header">Coupons purchased:</div>
        <div className="statistics-info-result">{numberOfCouponsPurchased}</div>
      </div>
    </div>
  ) : (
    <div className="Statistics">
      <div className="statistics-info">
        <HiOutlineTicket size={50} className="statistics-info-logo" />
        <div className="statistics-info-header">
          Company coupons in the system:
        </div>
        <div className="statistics-info-result">{numOfCompanyCoupons}</div>
      </div>
      <div className="statistics-info">
        <BiPurchaseTagAlt size={50} className="statistics-info-logo" />
        <div className="statistics-info-header">Company coupons purchased:</div>
        <div className="statistics-info-result">{companyCouponsPurchased}</div>
      </div>
    </div>
  );
}

export default Statistics;
