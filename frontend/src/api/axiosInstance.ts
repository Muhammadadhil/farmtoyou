import axios from "axios";
// import requestInterceptor from "./interceptors/requestInterceptor";
// import { handleErrorResponseInterceptor } from "./interceptors/responseInterceptor";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// instance.interceptors.request.use(requestInterceptor);
// instance.interceptors.response.use((response) => response, handleErrorResponseInterceptor);

export default instance;
