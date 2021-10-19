import "./AboutUs.css";
import { FaJava, FaReact, FaHtml5 } from "react-icons/fa";
import {
  SiHeroku,
  SiTypescript,
  SiCss3,
  SiSpring,
  SiRedux,
} from "react-icons/si";
import { BsFillLockFill } from "react-icons/bs";
import { GrMysql } from "react-icons/gr";

function AboutUs(): JSX.Element {
  return (
    <div className="AboutUs">
      <h1 className="about-us-title">ABOUT-US</h1>
      <p className="about-us-text">
        During the full stack java course we have taken at John Bryce, we were
        requested to build a fully working coupon system that allows buyers to
        purchase coupons, companies to upload and keep track of their listed
        products, as well as giving the admin of the site full control over the
        system by giving him special capabilities only available to him. we have
        decided to take this project a few steps forward on the functionl and
        design aspects and we beilieve it is shown through the differnet
        technologies we have been using on our journey to the final product.
      </p>
      <div className="wrapper">
        <div className="icon react">
          <div className="tooltip">React</div>
          <span>
            <FaReact size={30} />
          </span>
        </div>
        <div className="icon typeScript">
          <div className="tooltip">TypeScript</div>
          <span>
            <SiTypescript size={30} />
          </span>
        </div>
        <div className="icon html">
          <div className="tooltip">HTML</div>
          <span>
            <FaHtml5 size={35} />
          </span>
        </div>
        <div className="icon css">
          <div className="tooltip">CSS</div>
          <span>
            <SiCss3 size={30} />
          </span>
        </div>
        <div className="icon heroku">
          <div className="tooltip">Heroku</div>
          <span>
            <SiHeroku size={30} />
          </span>
        </div>
      </div>
      <div className="wrapper">
        <div className="icon java">
          <div className="tooltip">Java</div>
          <span>
            <FaJava size={30} />
          </span>
        </div>
        <div className="icon mySql">
          <div className="tooltip">MySQL</div>
          <span>
            <GrMysql size={30} />
          </span>
        </div>
        <div className="icon spring">
          <div className="tooltip">Spring</div>
          <span>
            <SiSpring size={30} />
          </span>
        </div>
        <div className="icon spring-security">
          <div className="tooltip">Spring Security</div>
          <span>
            <BsFillLockFill size={30} />
          </span>
        </div>
        <div className="icon redux">
          <div className="tooltip">Redux</div>
          <span>
            <SiRedux size={30} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
