import "./CompanyDashboardData.css";
import MaterialTable from "material-table";
import { SyntheticEvent, useEffect, useState } from "react";
import { store } from "../../redux/store";
import axios from "axios";
import globals from "../../utils/Globals";
import Coupon from "../../models/coupon";
import { addNotification } from "../../utils/Notification";

function CompanyDashboardData(): JSX.Element {
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
        globals.urls.company.company +
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
        globals.urls.company.company +
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
        globals.urls.company.company +
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

  const addCoupon = (coupon: Coupon) => {
    axios
      .post<string>(
        globals.urls.company.company +
          store.getState().authState.loginUser.id +
          "/addCoupon",
        coupon
      )
      .then((response) => {
        coupon.id = Number.parseInt(response.data);
        setCouponsData([...couponsData, coupon]);
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

  const updateCoupon = (coupon: Coupon) => {
    axios
      .post<string>(
        globals.urls.company.company +
          store.getState().authState.loginUser.id +
          "/updateCoupon",
        coupon
      )
      .then((response) => {
        const updatedData = [...couponsData];
        updatedData.forEach((c) => {
          if (JSON.parse(JSON.stringify(c)).id === coupon.id) {
            updatedData[updatedData.indexOf(c)] = coupon;
          }
        });
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

  const deleteCoupon = (couponId: number) => {
    axios
      .delete(
        globals.urls.company.company +
          store.getState().authState.loginUser.id +
          "/deleteCoupon/" +
          couponId
      )
      .then((response) => {
        const updatedData = couponsData.filter(
          (c) => JSON.parse(JSON.stringify(c)).id !== couponId
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
    <div className="CompanyDashboardData">
      <div className="get-coupons-forms-container">
        <form
          id="get-by-max-price-form"
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
          id="get-by-category-form"
          className="get-coupons-form"
          onChange={(e) => setCategory((e.target as HTMLSelectElement).value)}
          onSubmit={getAllCouponsByCategory}
        >
          <div>Get All Coupons By Max Category :</div>
          <select name="categories" form="get-by-category-form">
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
            onRowAdd: (newRow: any) =>
              new Promise<void>((resolve, reject) => {
                const object = JSON.parse(JSON.stringify(newRow));
                const newCoupon = new Coupon();
                newCoupon.id = object.id;
                newCoupon.companyId = Number.parseInt(
                  store.getState().authState.loginUser.id
                );
                newCoupon.title = object.title;
                newCoupon.description = object.description;
                newCoupon.category = object.category;
                newCoupon.startDate = object.startDate;
                newCoupon.endDate = object.endDate;
                newCoupon.amount = object.amount;
                newCoupon.price = object.price;
                newCoupon.image = object.image;
                addCoupon(newCoupon);
                setTimeout(() => resolve(), 1000);
              }),
            onRowUpdate: (newRow: any) =>
              new Promise<void>((resolve, reject) => {
                const object = JSON.parse(JSON.stringify(newRow));
                const updatedCoupon = new Coupon();
                updatedCoupon.id = object.id;
                updatedCoupon.companyId = Number.parseInt(
                  store.getState().authState.loginUser.id
                );
                updatedCoupon.title = object.title;
                updatedCoupon.description = object.description;
                updatedCoupon.category = object.category;
                updatedCoupon.startDate = object.startDate;
                updatedCoupon.endDate = object.endDate;
                updatedCoupon.amount = object.amount;
                updatedCoupon.price = object.price;
                updatedCoupon.image = object.image;
                updateCoupon(updatedCoupon);
                setTimeout(() => resolve(), 1000);
              }),
            onRowDelete: (selectedRow: any) =>
              new Promise<void>((resolve, reject) => {
                deleteCoupon(JSON.parse(JSON.stringify(selectedRow)).id);
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

export default CompanyDashboardData;
