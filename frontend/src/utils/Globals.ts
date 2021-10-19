class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    login: "http://localhost:8080/login",
    administrator: {
      getAllCompanies: "http://localhost:8080/admin/allCompanies",
      getAllCustomers: "http://localhost:8080/admin/allCustomers",
      deleteCompany: "http://localhost:8080/admin/deleteCompany/",
      deleteCustomer: "http://localhost:8080/admin/deleteCustomer/",
      addCompany: "http://localhost:8080/admin/addCompany",
      updateCompany: "http://localhost:8080/admin/updateCompany",
      addCustomer: "http://localhost:8080/admin/addCustomer",
      updateCustomer: "http://localhost:8080/admin/updateCustomer",
      getOneCompanyById: "http://localhost:8080/admin/oneCompany/",
      getOneCustomerById: "http://localhost:8080/admin/oneCustomer/",
      getNumberOfCompanies: "http://localhost:8080/admin/numberOfCompanies/",
      getNumberOfCustomers: "http://localhost:8080/admin/numberOfCustomers/",
      getNumberOfCoupons: "http://localhost:8080/admin/numberOfCoupons/",
      getNumberOfCouponsPurchased:
        "http://localhost:8080/admin/numberOfCouponsPurchased/",
    },
    company: {
      company: "http://localhost:8080/company/",
    },
    customer: {
      customer: "http://localhost:8080/customer/",
    },
    guest: {
      getAllCoupons: "http://localhost:8080/guest/getAllCoupons",
      getAllCouponsByCategory:
        "http://localhost:8080/guest/getAllCouponsByCategory/",
      getAllCouponsByDate:
        "http://localhost:8080/guest/getAllCouponsSortedByDate",
      getAllCouponsByPopularity:
        "http://localhost:8080/guest/getAllCouponsSortedByPopularity",
      getAllCouponsBySearchWordInTitle:
        "http://localhost:8080/guest/getAllCouponsBySearchWordInTitle/",
    },
    register: "http://localhost:8080/guest/register",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    login: "/login",
    administrator: {
      getAllCompanies: "/admin/allCompanies",
      getAllCustomers: "/admin/allCustomers",
      deleteCompany: "/admin/deleteCompany/",
      deleteCustomer: "/admin/deleteCustomer/",
      addCompany: "/admin/addCompany",
      updateCompany: "/admin/updateCompany",
      addCustomer: "/admin/addCustomer",
      updateCustomer: "/admin/updateCustomer",
      getOneCompanyById: "/admin/oneCompany/",
      getOneCustomerById: "/admin/oneCustomer/",
      getNumberOfCompanies: "/admin/numberOfCompanies/",
      getNumberOfCustomers: "/admin/numberOfCustomers/",
      getNumberOfCoupons: "/admin/numberOfCoupons/",
      getNumberOfCouponsPurchased: "/admin/numberOfCouponsPurchased/",
    },
    company: {
      company: "/company/",
    },
    customer: {
      customer: "/customer/",
    },
    guest: {
      getAllCoupons: "/guest/getAllCoupons",
      getAllCouponsByCategory: "/guest/getAllCouponsByCategory/",
      getAllCouponsByDate: "/guest/getAllCouponsSortedByDate",
      getAllCouponsByPopularity: "/guest/getAllCouponsSortedByPopularity",
      getAllCouponsBySearchWordInTitle:
        "/guest/getAllCouponsBySearchWordInTitle/",
    },
    register: "/guest/register",
  };
}

const globals =
  process.env.NODE_ENV === "production"
    ? new ProductionGlobals()
    : new DevelopmentGlobals();

export default globals;
