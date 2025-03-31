import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://infinitychat-od5i.onrender.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials : true,
})

// Add an interceptor to attach the token to every request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt"); // Check if the token is stored
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
