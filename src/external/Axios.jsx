import axios from "axios";

const https = require('https')
const agent = new https.Agent({
    rejectUnauthorized: false
})
export const API = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
    httpAgent: agent,
    httpsAgent: agent
})