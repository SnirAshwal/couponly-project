import "./Header.css";
import { useState } from "react";
import newsletterImage from "../../assets/GraphicElements/Main/HolidayHeader.png";
import Newsletter from "../Newsletter/Newsletter";

function Header(): JSX.Element {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="Header">
      <div className="header-image-container">
        <img src={newsletterImage} alt="coupon-img" className="header-img" />
      </div>
      <div className="newsletter">
        <div className="newsletter-text">
          Sign Up to our{" "}
          <span className="newsletter-text-span">newsletter</span> and be the
          first to get the
          <span className="best-deals"> BEST DEALS!</span>
        </div>
        <button onClick={() => setModalShow(true)} className="newsletter-btn">
          Keep In Touch
        </button>
        {modalShow && <Newsletter setModalShow={setModalShow} />}
      </div>
    </div>
  );
}

export default Header;
