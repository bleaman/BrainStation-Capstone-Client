// api.js
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://skill-seeker-api.onrender.com",
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
