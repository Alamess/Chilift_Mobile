import axios from "axios";

var axiosInstance;

let generateAxiosInstance = async () => {
  axiosInstance = await axios.create({
    baseURL: `http://localhost:9000/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  axiosInstance.interceptors.request.use((req) => {
    const token = window.sessionStorage.getItem("token") || "";
    req.headers.Authorization = token;
    return req;
  });
};

export { axiosInstance, generateAxiosInstance };
