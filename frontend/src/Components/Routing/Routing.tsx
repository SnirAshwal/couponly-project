import { Switch, Route } from "react-router-dom";
import CouponPage from "../CouponPage/CouponPage";
import Coupons from "../Coupons/Coupons";
import Dashboard from "../Dashboard/Dashboard";
import Main from "../Main/Main";
import Page404 from "../Page404/Page404";
import Search from "../Search/Search";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/" component={Main} exact></Route>
        <Route path="/coupons" component={Coupons} exact></Route>
        <Route path="/couponPage" component={CouponPage} exact></Route>
        <Route path="/dashboard" component={Dashboard} exact></Route>
        <Route path="/search" component={Search} exact></Route>
        <Route component={Page404} exact></Route>
      </Switch>
    </div>
  );
}

export default Routing;
