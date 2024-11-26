// api helper

import axios from "axios";

//pass new generated access token here
let accessToken = localStorage.getItem("accessToken");
const refresh = localStorage.getItem("refreshToken");

//apply base url for axios
const API_URL = "https://onshorkin.com/i8fd90sd/v09cxvjksdf/xzs9/sda9";

const axiosApi = axios.create({
	baseURL: API_URL,
})

axiosApi.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

let retryCounter = 0;

axiosApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Проверяем, что ошибка - это ошибка 401 и не является запросом на обновление токена
		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			if (retryCounter < 2) {
				retryCounter++;

				try {
					// Отправляем запрос на обновление токена с использованием refresh токена
					const response = await axiosApi.post("/auth/token/refresh/", { refresh });
					const newAccessToken = response.data.access;

					// Обновляем access токен и сохраняем его в localStorage
					localStorage.setItem("accessToken", newAccessToken);

					// Здесь вы также можете обновить заголовок Authorization для текущего запроса
					originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

					// Повторно отправляем исходный запрос с обновленным access токеном
					return axiosApi(originalRequest);
				} catch (refreshError) {
					// Если обновление токена также завершается ошибкой, перенаправьте пользователя на страницу входа
					if (refreshError.response && refreshError.response.status === 401) {
						localStorage.removeItem("accessToken");
						localStorage.removeItem("refreshToken");
						window.location.href = "/login";
					}
					// или выполните другое действие по обработке ошибки
					return Promise.reject(refreshError);
				}
			}

			retryCounter = 0;
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
