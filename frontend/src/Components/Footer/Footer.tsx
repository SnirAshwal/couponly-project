import "./Footer.css";
import { useHistory } from "react-router";
import { Link } from "react-scroll";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer(): JSX.Element {
  const history = useHistory();

  return (
    <div className="Footer">
      <div className="footer-container">
        <div className="footer-item">
          <h3 className="footer-item-title">Information</h3>
          <ul className="footer-list">
            <li>
              <Link
                className="scroll-link"
                activeClass="active"
                to="about-us"
                onClick={() => history.push("/")}
              >
                About-Us
              </Link>
            </li>
            <li>
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: undefined,
                  },
                }}
                style={{ textDecoration: "none" }}
              >
                Coupons
              </NavLink>
            </li>
            <li>
              <Link
                className="scroll-link"
                activeClass="active"
                to="contact-us"
                onClick={() => history.push("/")}
              >
                Contact-Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <h3 className="footer-item-title">Legal</h3>
          <ul className="footer-list">
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
            <li>Copyright Information</li>
            <li>Licence Agreement</li>
            <li>Cookies Policy</li>
          </ul>
        </div>
        <div className="footer-item">
          <h3 className="footer-item-title">Social</h3>
          <ul className="footer-list">
            <li>
              {" "}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookSquare size={25} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagramSquare size={25} />
              </a>
            </li>
            <li>
              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsappSquare size={25} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
