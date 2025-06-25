import axios from "axios";

const https = require('https')
const agent = new https.Agent({
    rejectUnauthorized: false
})
export const API = axios.create({
    baseURL: "http://47.84.71.54:8000",
    timeout: 10000,
    httpAgent: agent,
    httpsAgent: agent
})