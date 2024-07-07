import axios from "axios";
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
});
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        const localStorage = window.localStorage.getItem("persist:shop/user");
        
        // localStorage = JSON.parse(localStorage);
        const {token} = JSON.parse(localStorage)


        // console.log('token',token);
        if (token !=="") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return error.response.data;
    }
);

export default instance;
