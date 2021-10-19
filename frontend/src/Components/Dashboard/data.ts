export const AdminActions = [
  {
    id: 1,
    name: "Add Company",
    url: "http://localhost:8080/admin/addCompany",
    inputs: ["name", "email", "password"],
  },
  {
    id: 2,
    name: "Update Company",
    url: "",
    inputs: ["Company name", "Company email", "Company password"],
  },
  {
    id: 3,
    name: "Delete Company",
    url: "",
    inputs: ["Company Id"],
  },
  {
    id: 4,
    name: "Get All Companies",
    url: "http://localhost:8080/admin/allCompanies",
    inputs: [],
  },
  {
    id: 5,
    name: "Find One Company",
    url: "",
    inputs: [],
  },
  {
    id: 6,
    name: "Add Customer",
    url: "",
    inputs: [
      "Customer First name",
      "Customer Last name",
      "Customer email",
      "Customer password",
    ],
  },
  {
    id: 7,
    name: "Update Customer",
    url: "",
    inputs: [
      "Customer id",
      "Customer First name",
      "Customer Last name",
      "Customer email",
      "Customer password",
    ],
  },
  {
    id: 8,
    name: "Delete Customer",
    url: "",
    inputs: ["Customer Id"],
  },
  {
    id: 9,
    name: "Get All Customers",
    url: "",
    inputs: [],
  },
  {
    id: 10,
    name: "Find One Customer",
    url: "",
    inputs: [],
  },
];
