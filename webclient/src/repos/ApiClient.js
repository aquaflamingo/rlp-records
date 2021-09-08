import axios from "axios"
import conf from "../config"

const instance = axios.create({
  baseURL: conf.API_URL,
  timeout: 1000,
});

export default instance
