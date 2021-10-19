import "./App.css";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Routing from "./Components/Routing/Routing";
import ReactNotification from "react-notifications-component";
import { CartContext, CartProvider } from "./Contexts/CartContext";
import { LoginProvider } from "./Contexts/LoginContext";
import { PurchaseModalProvider } from "./Contexts/PurchaseModalContext";
import { JWTAxios } from "./utils/jwtAxios";
import { useHistory } from "react-router";
import { useContext } from "react";

function App() {
  const history = useHistory();
  const { cartDispatch } = useContext(CartContext);
  JWTAxios(history, cartDispatch);

  return (
    <div className="App">
      <ReactNotification />
      <CartProvider>
        <LoginProvider>
          <PurchaseModalProvider>
            <Navbar />
            <Routing />
            <Footer />
          </PurchaseModalProvider>
        </LoginProvider>
      </CartProvider>
    </div>
  );
}

export default App;
