const hostApi =
  process.env.NODE_ENV === "development"
    ? "http://localhost"
    : "https://map-be-abe893efe93b.herokuapp.com/";
const portApi = process.env.NODE_ENV === "development" ? 8080 : "";
// const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;
const baseURLApi = "https://map-be-abe893efe93b.herokuapp.com/";
const redirectUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/light-blue-react"
    : "https://demo.flatlogic.com/light-blue-react";

export default {
  redirectUrl,
  hostApi,
  portApi,
  baseURLApi,
  remote: "https://map-be-abe893efe93b.herokuapp.com/",
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: "admin@flatlogic.com",
    password: "password",
  },
  app: {
    colors: {
      dark: "#333964",
      light: "#0A0417",
      sea: "#4A4657",
      sky: "#3A3847",
      rain: "#3846AA",
      middle: "#3390C3",
    },
  },
};
