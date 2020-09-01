import axios from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:3091',
    timeout: 20000,
});

export { Axios };