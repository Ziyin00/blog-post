import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-backend-7g6p.onrender.com/api", // backend base URL
  headers: {},
});

export default instance;
