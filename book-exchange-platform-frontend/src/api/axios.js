import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default API;