import axios from "axios";
import http from "http";

const agent = new http.Agent({
    rejectUnauthorized: false
})
export const API = axios.create({
    baseURL: "http://47.84.71.54:8000",
    timeout: 10000,
    httpAgent: agent,
})