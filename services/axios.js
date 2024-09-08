import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://api.nasa.gov/planetary',
    headers: {'Content-Type': 'application/json'}
})

export default axiosInstance;