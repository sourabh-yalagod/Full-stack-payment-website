import axios from "axios";
import { userAuth } from "./User";
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL + "/api/v1"}`,
  headers: {
    Authorization: `Bearer ${userAuth()}}`,
  },
});
