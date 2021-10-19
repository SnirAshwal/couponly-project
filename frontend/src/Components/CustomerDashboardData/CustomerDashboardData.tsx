import axios from "axios";
import MaterialTable from "material-table";
import { SyntheticEvent, useEffect, useState } from "react";
import { store } from "../../redux/store";
import globals from "../../utils/Globals";
import { addNotification } from "../../utils/Notification";
import "./CustomerDashboardData.css";

function CustomerDashboardData(): JSX.Element {
  const [couponsData, setCouponsData] = useState([{}]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("VACATION");

  const CouponColumns = [
    {
      title: "image",
      field: "image",
      render: (row: any) => (
        <img
          src={row.image}
          alt={row.title}
          style={{ width: "100px", borderRadius: "10px" }}
        />
      ),
    },
    { title: "title", field: "title" },
    {
      title: "category",
      field: "category",
      lookup: {
        FOOD: "FOOD",
        VACATION: "VACATION",
        ELECTRICITY: "ELECTRICITY",
        FASHION: "FASHION",
        ATTRACTIONS: "ATTRACTIONS",
        DECOR: "DECOR",
        BEAUTY: "BEAUTY",
      },
    },
    { title: "description", field: "description" },
    { title: "start Date", field: "startDate", type: "date" as const },
    { title: "end Date", field: "endDate", type: "date" as const },
    { title: "amount", field: "amount", type: "numeric" as const },
    { title: "price", field: "price", type: "numeric" as const },
  ];
  function fetchData() {
    axios
      .get(
        globals.urls.customer.customer +
          store.getState().authState.loginUser.id +
          "/coupons"
      )
      .then((response) => {
        setCouponsData(
          response.data.map((coupon: any) => {
            const {
              id,
              companyId,
              title,
              category,
              description,
              startDate,
              endDate,
              amount,
              price,
              image,
            } = coupon;
            return {
              id: id,
              companyId: companyId,
              title: title,
              description: description,
              category: category,
              startDate: startDate,
              endDate: endDate,
              amount: amount,
              price: price,
              image: image,
            };
          })
        );
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
  }

  const getAllCouponsByMaxPrice = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .get(
        globals.urls.customer.customer +
          store.getState().authState.loginUser.id +
          "/couponsByMaxPrice/" +
          maxPrice
      )
      .then((response) => {
        setCouponsData(
          response.data.map((coupon: any) => {
            const {
              id,
              companyId,
              title,
              category,
              description,
              startDate,
              endDate,
              amount,
              price,
              image,
            } = coupon;
            return {
              id: id,
              companyId: companyId,
              title: title,
              description: description,
              category: category,
              startDate: startDate,
              endDate: endDate,
              amount: amount,
              price: price,
              image: image,
            };
          })
        );
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

  const getAllCouponsByCategory = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .get(
        globals.urls.customer.customer +
          store.getState().authState.loginUser.id +
          "/couponsByCategory/" +
          category
      )
      .then((response) => {
        setCouponsData(
          response.data.map((coupon: any) => {
            const {
              id,
              companyId,
              title,
              category,
              description,
              startDate,
              endDate,
              amount,
              price,
              image,
            } = coupon;
            return {
              id: id,
              companyId: companyId,
              title: title,
              description: description,
              category: category,
              startDate: startDate,
              endDate: endDate,
              amount: amount,
              price: price,
              image: image,
            };
          })
        );
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

  const deletePurchaseCoupon = (coupon: any) => {
    axios
      .delete(
        globals.urls.customer.customer +
          store.getState().authState.loginUser.id +
          "/deletePurchaseCoupon",
        {
          data: {
            id: coupon.id,
            companyId: coupon.companyId,
            title: coupon.title,
            description: coupon.description,
            category: coupon.category,
            startDate: coupon.startDate,
            endDate: coupon.endDate,
            amount: coupon.amount,
            price: coupon.price,
            image: coupon.image,
          },
        }
      )
      .then((response) => {
        const updatedData = couponsData.filter(
          (c) => JSON.parse(JSON.stringify(c)).id !== coupon.id
        );
        setCouponsData(updatedData);
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
    fetchData();
  }, []);

  return (
    <div className="CustomerDashboardData">
      <div className="get-coupons-forms-container">
        <form
          className="get-coupons-form"
          onChange={(e) =>
            setMaxPrice(Number.parseInt((e.target as HTMLInputElement).value))
          }
          onSubmit={getAllCouponsByMaxPrice}
        >
          <div>Get All Coupons By Max Price :</div>
          <input type="number" name="max-price" />
          <button type="submit">Submit</button>
        </form>
        <form
          className="get-coupons-form"
          onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
          onSubmit={getAllCouponsByCategory}
        >
          <div>Get All Coupons By Category :</div>
          <select name="categories">
            <option value="VACATION">VACATION</option>
            <option value="FOOD">FOOD</option>
            <option value="FASHION">FASHION</option>
            <option value="ELECTRICITY">ELECTRICITY</option>
            <option value="DECOR">DECOR</option>
            <option value="BEAUTY">BEAUTY</option>
            <option value="ATTRACTIONS">ATTRACTIONS</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <button id="restart-coupon-btn" onClick={fetchData}>
          Restart
        </button>
      </div>
      <div className="table">
        <MaterialTable
          data={couponsData}
          title="Coupons"
          columns={CouponColumns}
          style={{ borderRadius: "20px", width: "95%", margin: "0 auto" }}
          editable={{
            onRowDelete: (selectedRow: any) =>
              new Promise<void>((resolve, reject) => {
                const object = JSON.parse(JSON.stringify(selectedRow));
                deletePurchaseCoupon(object);
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
          }}
        ></MaterialTable>
      </div>
    </div>
  );
}

export default CustomerDashboardData;
