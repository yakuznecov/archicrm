// api helper

import axios from "axios";

//pass new generated access token here
let accessToken = localStorage.getItem("accessToken");
const refresh = localStorage.getItem("refreshToken") ? localStorage.getItem("refreshToken") : null;

//apply base url for axios
const API_URL = "https://onshorkin.com/i8fd90sd/v09cxvjksdf/xzs9/sda9";

const axiosApi = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${accessToken}`,
	},
})

axiosApi.interceptors.response.use(
	(res) => { return res },
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			const response = await axios.post(API_URL + "/auth/token/refresh/", { refresh });
			const newAccessToken = response.data.access;
			// Обновляем access токен и сохраняем его в localStorage
			window.localStorage.setItem("accessToken", newAccessToken);

			// Retry the original request with the new access token
			originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

			return axiosApi.request(originalRequest);
		}

		// Если ошибка не связана с токенами, просто передайте ее дальше
		return Promise.reject(error);
	}
);

export async function get(url, config = {}) {
	try {
		const response = await axiosApi.get(url, { ...config });
		return response.data;
	} catch (error) {
		console.error('Error in GET request:', error);
		throw error;
	}
}

export async function post(url, data, config = {}) {
	try {
		const response = await axiosApi.post(url, { ...data }, { ...config });
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function put(url, data, config = {}) {
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then(response => response.data)
}

export async function del(url, config = {}) {
	return await axiosApi
		.delete(url, { ...config })
		.then(response => response.data)
}

export async function patch(url, data, config = {}) {
	try {
		const response = await axiosApi.patch(url, { ...data }, { ...config });
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}
