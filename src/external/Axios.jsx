import axios from "axios";
export const API = axios.create({
    baseURL: "https://sandysihotang.site",
    timeout: 10000,
})
