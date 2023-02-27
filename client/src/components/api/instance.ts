import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:5500",
    timeout: 2000
})
export default axiosInstance