import axios from "axios";
import https from "https";
const agent = new https.Agent({
    rejectUnauthorized: false
})
export const API = axios.create({
    baseURL: "http://47.84.71.54:8000",
    timeout: 10000,
    httpAgent: agent,
    httpsAgent: agent
})