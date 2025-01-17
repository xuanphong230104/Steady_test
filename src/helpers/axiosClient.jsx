import axios from "axios";
import storage from "./localStorage";

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

axiosClient.interceptors.request.use((request) => {
  const authorization = storage.getAuthToken();
  if (authorization) request.headers.Authorization = `Token ${authorization}`;
  return request;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    if (data && typeof data === "object") {
      error.response.data.message = Object.values(error.response.data).join(
        " ",
      );
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
