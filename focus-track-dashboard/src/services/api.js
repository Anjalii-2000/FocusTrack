import axios from "axios";

export const api = axios.create({
  baseURL: "https://focustrack-p4uc.onrender.com"
});