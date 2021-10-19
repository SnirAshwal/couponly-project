import { useHistory } from "react-router-dom";
import "./Login.css";
import signUp from "../../assets/GraphicElements/Main/signUp/SignUp.png";
import SignUpCouponly from "../../assets/GraphicElements/Main/signUp/SignUpCouponly.png";
import SignInCouponly from "../../assets/GraphicElements/Main/signUp/SignInCouponly.png";
import { useContext, useEffect, useState } from "react";
import UserDetails from "../../models/userDetails";
import axios from "axios";
import { store } from "../../redux/store";
import { loginUser } from "../../redux/authState";
import { useForm } from "react-hook-form";
import CustomerDetails from "../../models/CustomerDetails";
import globals from "../../utils/Globals";
import { addNotification } from "../../utils/Notification";
import { LoginContext } from "../../Contexts/LoginContext";
import { LoginActionType } from "../../Contexts/LoginContext";

function Login(): JSX.Element {
  const history = useHistory();
  const [failedLogin, setFailedLogin] = useState(false);
  const [isRegisterd, setIsRegisterd] = useState(false);
  const { LoginDispatch } = useContext(LoginContext);

  const { register, handleSubmit } = useForm<UserDetails>();

  const RegisterForm = useForm<CustomerDetails>();

  const handleLoginForm = (userDetails: UserDetails) => {
    axios
      .post<string>(globals.urls.login, userDetails)
      .then((response) => {
        store.dispatch(
          loginUser(response.headers.authorization.replace("Bearer ", ""))
        );
        LoginDispatch({
          type: LoginActionType.SHOW_LOGIN_MODAL,
          payload: false,
        });
        addNotification(
          "Logged in Successfully",
          "Hello",
          "success",
          "top",
          "top-right",
          170,
          ["animate__animated", "animate__fadeInRight"],
          ["animate__animated", "animate__fadeOutRight"],
          {
            duration: 1500,
          }
        );
        history.push("/");
      })

      .catch((error) => {
        setFailedLogin(true);
      });
  };

  const handleRegisterForm = (customerDetails: CustomerDetails) => {
    axios
      .post<string>(globals.urls.register, customerDetails)
      .then((response) => {
        const newCustomer = new UserDetails();
        newCustomer.username = customerDetails.email;
        newCustomer.password = customerDetails.password;
        handleLoginForm(newCustomer);
      })

      .catch((error) => {
        setFailedLogin(true);
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
    const timeout = setTimeout(() => {
      setFailedLogin(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [failedLogin]);

  return (
    <div className="Login">
      <div className="login-modal">
        <div
          className="login-side"
          id="login-side"
          style={isRegisterd ? { order: 2 } : { order: 1 }}
        >
          <img src={signUp} alt="signUpPhoto" className="signUpPhoto" />
          {isRegisterd ? (
            <div
              className="register-link"
              onClick={() => setIsRegisterd(false)}
            >
              SIGN IN
            </div>
          ) : (
            <div className="register-link" onClick={() => setIsRegisterd(true)}>
              SIGN UP
            </div>
          )}
        </div>
        <div
          className="login-input-side"
          id="login-input-side"
          style={isRegisterd ? { order: 1 } : { order: 2 }}
        >
          <button
            className="close-btn"
            onClick={() =>
              LoginDispatch({
                type: LoginActionType.SHOW_LOGIN_MODAL,
                payload: false,
              })
            }
          ></button>
          <img
            src={isRegisterd ? SignUpCouponly : SignInCouponly}
            alt="title"
            className="sign-title"
          />
          {!isRegisterd ? (
            <form
              className="login-form"
              onSubmit={handleSubmit(handleLoginForm)}
              id="login-form"
            >
              {failedLogin && (
                <div className="login-failed">
                  USERNAME OR PASSWORD ARE INCORRECT
                </div>
              )}
              <input
                type="email"
                {...register("username")}
                required
                placeholder="Please enter your Email"
              />
              <br />
              <br />
              <input
                type="password"
                {...register("password")}
                required
                placeholder="Please enter your Password"
              />
              <br />
              <br />
              <button type="submit" value="Submit" className="login-submit-btn">
                Submit
              </button>
            </form>
          ) : (
            <form
              className="register-form"
              onSubmit={RegisterForm.handleSubmit(handleRegisterForm)}
              id="register-form"
            >
              {failedLogin && (
                <div className="login-failed">USERNAME ALREADY TAKEN</div>
              )}
              <input
                type="text"
                {...RegisterForm.register("firstName")}
                required
                placeholder="Please enter your First Name"
              />
              <br />
              <br />
              <input
                type="text"
                {...RegisterForm.register("lastName")}
                required
                placeholder="Please enter your Last Name"
              />
              <br />
              <br />
              <input
                type="email"
                {...RegisterForm.register("email")}
                required
                placeholder="Please enter your Email"
              />
              <br />
              <br />
              <input
                type="password"
                {...RegisterForm.register("password")}
                required
                placeholder="Please enter your Password"
              />
              <br />
              <br />
              <br />
              <button type="submit" value="Submit" className="login-submit-btn">
                REGISTER
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
