import axios from "axios";

export const api = axios.create({
  baseURL: "http://172.27.41.3:3000/api",
});
