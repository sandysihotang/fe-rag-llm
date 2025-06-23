import axios from "axios";

export const API = axios.create({
    baseURL: "https://kjlmf01f-8000.asse.devtunnels.ms/",
    timeout: 10000
})