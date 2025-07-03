import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3032/api", // backend base URL
  headers: {},
});

export default instance;
