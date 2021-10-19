import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import "./AdminDashboardData.css";
import Company from "../../models/company";
import Customer from "../../models/customer";
import globals from "../../utils/Globals";
import { addNotification } from "../../utils/Notification";
import MaterialTable from "material-table";

interface DashboardDataProps {
  dataType: string;
  setDataType: Dispatch<SetStateAction<string>>;
}
function AdminDashboardData(props: DashboardDataProps): JSX.Element {
  const [data, setData] = useState([{}]);
  const [oneCustomerId, setOneCustomerId] = useState(0);
  const [oneCompanyId, setOneCompanyId] = useState(0);
  const { dataType, setDataType } = props;

  function fetchData() {
    const url =
      props.dataType === "companies"
        ? globals.urls.administrator.getAllCompanies
        : globals.urls.administrator.getAllCustomers;
    axios
      .get(url)
      .then((response) => {
        setData(
          props.dataType === "companies"
            ? response.data.map((company: any) => {
                const { id, name, email, password } = company;
                return {
                  id: id,
                  name: name,
                  email: email,
                  password: password,
                };
              })
            : response.data.map((customer: any) => {
                const { id, firstName, lastName, email, password } = customer;
                return {
                  id: id,
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                };
              })
        );
      })
      .catch((error) => {
        addNotification(
          "Error",
          "test",
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

  const getOneCompanyById = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .get(globals.urls.administrator.getOneCompanyById + oneCompanyId)
      .then((response) => {
        if (typeof response.data === "string") {
          throw new Error();
        }
        setDataType("company");
        setData([response.data]);
      })
      .catch((error) => {
        addNotification(
          "Error",
          "This Company does not exists",
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

  const getOneCustomerById = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .get(globals.urls.administrator.getOneCustomerById + oneCustomerId)
      .then((response) => {
        if (typeof response.data === "string") {
          throw new Error();
        }
        setDataType("customer");
        setData([response.data]);
      })
      .catch((error) => {
        addNotification(
          "Error",
          "This Customer does not exists",
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

  const deleteObject = (id: number) => {
    axios
      .delete(
        props.dataType === "companies"
          ? globals.urls.administrator.deleteCompany + id
          : globals.urls.administrator.deleteCustomer + id
      )
      .then(() => {
        const updatedData = data.filter(
          (object) => JSON.parse(JSON.stringify(object)).id !== id
        );
        setData(updatedData);
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

  const addCompany = (company: Company) => {
    axios
      .post<string>(globals.urls.administrator.addCompany, company, {})
      .then((response) => {
        company.id = Number.parseInt(response.data);

        setData([...data, company]);
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

  const updateCompany = (company: Company) => {
    axios
      .post<string>(globals.urls.administrator.updateCompany, company, {})
      .then((response) => {
        company.id = Number.parseInt(response.data);
        const updatedData = [...data];
        updatedData.forEach((c) => {
          if (JSON.parse(JSON.stringify(c)).id === company.id) {
            updatedData[updatedData.indexOf(c)] = company;
          }
        });
        setData(updatedData);
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

  const updateCustomer = (customer: Customer) => {
    axios
      .post<string>(globals.urls.administrator.updateCustomer, customer, {})
      .then((response) => {
        customer.id = Number.parseInt(response.data);
        const updatedData = [...data];
        updatedData.forEach((c) => {
          if (JSON.parse(JSON.stringify(c)).id === customer.id) {
            updatedData[updatedData.indexOf(c)] = customer;
          }
        });
        setData(updatedData);
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

  const addCustomer = (customer: Customer) => {
    axios
      .post<string>(globals.urls.administrator.addCustomer, customer, {})
      .then((response) => {
        customer.id = Number.parseInt(response.data);
        setData([...data, customer]);
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
    if (dataType === "customers" || dataType === "companies") {
      fetchData();
    }
  }, [dataType]);

  const CompanyColumns = [
    { title: "name", field: "name" },
    { title: "email", field: "email" },
    { title: "password", field: "password" },
  ];

  const CustomerColumns = [
    { title: "first name", field: "firstName" },
    { title: "last name", field: "lastName" },
    { title: "email", field: "email" },
    { title: "password", field: "password" },
  ];

  return (
    <div className="AdminDashboardData">
      <div className="AdminDashboardData-table">
        <div className="get-coupons-forms-container">
          <form
            className="get-coupons-form"
            onChange={(e) =>
              setOneCompanyId(
                Number.parseInt((e.target as HTMLInputElement).value)
              )
            }
            onSubmit={getOneCompanyById}
          >
            <div>Get one company By ID:</div>
            <input type="number" name="company-id" />
            <button type="submit">Submit</button>
          </form>
          <form
            className="get-coupons-form"
            onChange={(e) =>
              setOneCustomerId(
                Number.parseInt((e.target as HTMLInputElement).value)
              )
            }
            onSubmit={getOneCustomerById}
          >
            <div>Get one customer By ID:</div>
            <input type="number" name="customer-id" />
            <button type="submit">Submit</button>
          </form>

          <button id="restart-coupon-btn" onClick={fetchData}>
            Restart
          </button>
        </div>
        <div className="DataTable">
          <MaterialTable
            title={`${
              dataType === "companies" || dataType === "company"
                ? "Companies"
                : "Customers"
            }`}
            data={data}
            columns={
              dataType === "companies" || dataType === "company"
                ? CompanyColumns
                : CustomerColumns
            }
            style={{ borderRadius: "20px", width: "95%", margin: "0 auto" }}
            editable={{
              onRowAdd: (newRow: any) =>
                new Promise<void>((resolve, reject) => {
                  const object = JSON.parse(JSON.stringify(newRow));

                  if (dataType === "companies") {
                    const newCompany = new Company();
                    newCompany.name = object.name;
                    newCompany.email = object.email;
                    newCompany.password = object.password;
                    addCompany(newCompany);
                  } else {
                    const newCustomer = new Customer();
                    newCustomer.firstName = object.firstName;
                    newCustomer.lastName = object.lastName;
                    newCustomer.email = object.email;
                    newCustomer.password = object.password;
                    addCustomer(newCustomer);
                  }
                  setTimeout(() => resolve(), 1000);
                }),
              onRowUpdate: (newRow: any) =>
                new Promise<void>((resolve, reject) => {
                  const object = JSON.parse(JSON.stringify(newRow));
                  if (dataType === "companies") {
                    const updatedCompany = new Company();
                    updatedCompany.id = object.id;
                    updatedCompany.name = object.name;
                    updatedCompany.email = object.email;
                    updatedCompany.password = object.password;
                    updateCompany(updatedCompany);
                  } else {
                    const newCustomer = new Customer();
                    newCustomer.id = object.id;
                    newCustomer.firstName = object.firstName;
                    newCustomer.lastName = object.lastName;
                    newCustomer.email = object.email;
                    newCustomer.password = object.password;
                    updateCustomer(newCustomer);
                  }
                  setTimeout(() => resolve(), 1000);
                }),

              onRowDelete: (selectedRow: any) =>
                new Promise<void>((resolve, reject) => {
                  deleteObject(JSON.parse(JSON.stringify(selectedRow)).id);
                  setTimeout(() => {
                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardData;
