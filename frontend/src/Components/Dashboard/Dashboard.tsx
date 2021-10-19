import "./Dashboard.css";
import DashboardLogo from "../../assets/GraphicElements/Main/Dashboards/DashboardNavbarLogo.png";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import AdminDashboardData from "../AdminDashboardData/AdminDashboardData";
import CompanyDashboardData from "../CompanyDashboardData/CompanyDashboardData";
import CustomerDashboardData from "../CustomerDashboardData/CustomerDashboardData";
import { addNotification } from "../../utils/Notification";
import axios from "axios";
import globals from "../../utils/Globals";
import UserDetailsModal from "../UserDetailsModal/UserDetailsModal";
import UserInfo from "../../models/userInfo";
import Statistics from "../Statistics/Statistics";

function Dashboard(): JSX.Element {
  const [dataType, setDataType] = useState("companies");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [userDetails, setUserDetails] = useState(new UserInfo());
  const [showStatistics, setShowStatistics] = useState(false);

  const fetchUserDetails = () => {
    const userInfo = new UserInfo();
    store.getState().authState.loginUser.clientType === "COMPANY"
      ? axios
          .get(
            globals.urls.company.company +
              store.getState().authState.loginUser.id +
              "/details"
          )
          .then((response) => {
            const { id, name, email, password } = response.data;
            userInfo.id = id;
            userInfo.name = name;
            userInfo.email = email;
            userInfo.password = password;
            setUserDetails(userInfo);
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
                duration: 3000,
              }
            );
          })
      : axios
          .get(
            globals.urls.customer.customer +
              store.getState().authState.loginUser.id +
              "/details"
          )
          .then((response) => {
            const { id, firstName, lastName, email, password } = response.data;
            userInfo.id = id;
            userInfo.firstName = firstName;
            userInfo.lastName = lastName;
            userInfo.email = email;
            userInfo.password = password;
            setUserDetails(userInfo);
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
                duration: 3000,
              }
            );
          });
  };

  useEffect(() => {
    if (store.getState().authState.loginUser.clientType !== "ADMIN")
      fetchUserDetails();
  }, []);

  return (
    <div className="Dashboard">
      <div className="dashboard-side">
        {store.getState().authState.loginUser.clientType === "ADMIN" ? (
          <>
            <div className="header-dashboard">
              <img
                src={DashboardLogo}
                alt="dashboard-logo"
                className="dashboard-logo"
              />
              <div>Hello Admin,</div>
              <div style={{ fontSize: "1rem" }}>Welcome to your dashboard</div>
            </div>
            <div className="actions-container">
              <button
                onClick={() => {
                  setShowStatistics(false);
                  setDataType("companies");
                }}
                className="nav-btn dashboard-action"
              >
                Companies
              </button>
              <button
                onClick={() => {
                  setShowStatistics(false);
                  setDataType("customers");
                }}
                className="nav-btn dashboard-action"
              >
                Customers
              </button>
              <button
                className="nav-btn dashboard-action"
                onClick={() => setShowStatistics(true)}
              >
                statistics
              </button>
            </div>
          </>
        ) : store.getState().authState.loginUser.clientType === "COMPANY" ? (
          <>
            <div className="header-dashboard">
              <img
                src={DashboardLogo}
                alt="dashboard-logo"
                className="dashboard-logo"
              />
              <div>Hello {userDetails.name},</div>
              <div style={{ fontSize: "1rem" }}>Welcome to your dashboard</div>
            </div>
            <div className="actions-container">
              <button
                className="nav-btn dashboard-action"
                onClick={() => setShowStatistics(false)}
              >
                Coupons
              </button>
              <button
                className="nav-btn dashboard-action"
                onClick={() => setShowStatistics(true)}
              >
                statistics
              </button>
              <button
                className="nav-btn dashboard-action"
                onClick={() => setShowDetailsModal(true)}
              >
                Personal Details
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="header-dashboard">
              <img
                src={DashboardLogo}
                alt="dashboard-logo"
                className="dashboard-logo"
              />
              <div>Hello {userDetails.firstName},</div>
              <div style={{ fontSize: "1rem" }}>Welcome to your dashboard</div>
            </div>
            <div className="actions-container">
              <button className="nav-btn dashboard-action">Coupons</button>
              <button
                className="nav-btn dashboard-action"
                onClick={() => setShowDetailsModal(true)}
              >
                Personal Details
              </button>
            </div>
          </>
        )}
      </div>
      <div className="dashboard-data">
        {showStatistics ? (
          <Statistics />
        ) : store.getState().authState.loginUser.clientType === "ADMIN" ? (
          <AdminDashboardData dataType={dataType} setDataType={setDataType} />
        ) : store.getState().authState.loginUser.clientType === "COMPANY" ? (
          <CompanyDashboardData />
        ) : (
          <CustomerDashboardData />
        )}
      </div>
      {showDetailsModal && (
        <UserDetailsModal
          setShowDetailsModal={setShowDetailsModal}
          details={userDetails}
        />
      )}
    </div>
  );
}

export default Dashboard;
