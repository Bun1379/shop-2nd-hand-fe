import axios from "axios";
const BASE_URL = `http://localhost:3000/api/v1`;

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
        const token = localStorage.getItem("token"); // Không cần await
        if (!token) {
            return Promise.reject(
                new Error("Không có token, vui lòng đăng nhập lại.")
            );
        } else {
            config.headers["Authorization"] = `Bearer ${token}`;
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosClient, axiosPrivate };
