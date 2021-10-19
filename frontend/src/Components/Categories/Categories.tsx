import { NavLink } from "react-router-dom";
import { Category } from "../../models/coupon";
import "./Categories.css";

function Categories(): JSX.Element {
  return (
    <div className="categories">
      <div className="categories-title">Categories</div>
      <div className="categories__grid">
        <div className="vacation--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--vacation"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--vacation">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.VACATION,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Vacation
              </NavLink>
            </div>
          </div>
        </div>

        <div className="food--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--food"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--food">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.FOOD,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Food
              </NavLink>
            </div>
          </div>
        </div>

        <div className="fashion--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--fashion"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--fashion">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.FASHION,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Fashion
              </NavLink>
            </div>
          </div>
        </div>

        <div className="electronics--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--electronics"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--electronics">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.ELECTRICITY,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Electronics
              </NavLink>
            </div>
          </div>
        </div>

        <div className="decor--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--decor"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--decor">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.DECOR,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Decor
              </NavLink>
            </div>
          </div>
        </div>

        <div className="beauty--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--beauty"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--beauty">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.BEAUTY,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Beauty
              </NavLink>
            </div>
          </div>
        </div>

        <div className="attractions--grid">
          <div className="categories-card">
            <div className="categories-card__side categories-card__side--front categories-card__side--front--attractions"></div>
            <div className="categories-card__side categories-card__side--back categories-card__side--back--attractions">
              <NavLink
                exact
                to={{
                  pathname: "/coupons",
                  state: {
                    category: Category.ATTRACTIONS,
                  },
                }}
                style={{ textDecoration: "none", color: "white" }}
              >
                Attraction
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
