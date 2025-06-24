import axios from "axios";

export const API = axios.create({
    baseURL: "http://47.84.71.54:8000",
    timeout: 10000
})