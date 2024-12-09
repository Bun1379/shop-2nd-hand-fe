import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = `https://shop-2nd-hand.onrender.com/api/v1`;

// Tạo axios client chung
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để thực hiện thao tác này");
    } else {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data && error.response.data.EC === -999) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosClient, axiosPrivate };
