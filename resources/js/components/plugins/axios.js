import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/api'
})

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('token');

            if (!window.location.pathname.startsWith('/admins/login')) {
                window.location.href = '/admins/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
