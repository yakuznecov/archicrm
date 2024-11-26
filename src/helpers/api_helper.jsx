// api helper

import axios from 'axios';

const API_URL = 'https://onshorkin.com/i8fd90sd/v09cxvjksdf/xzs9/sda9';

let accessToken = localStorage.getItem('accessToken');
let refresh = localStorage.getItem('refreshToken');

function updateAuthToken(response) {
	accessToken = response.data.access;
	localStorage.setItem('accessToken', accessToken);
}

function logout() {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	window.location.href = '/login';
}

const axiosApi = axios.create({
	baseURL: API_URL,
});

axiosApi.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			refresh = localStorage.getItem('refreshToken'); // Обновляем перед каждым запросом

			try {
				const response = await axios.post(API_URL + '/auth/token/refresh/', {
					refresh,
				});
				updateAuthToken(response);

				originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
				return axiosApi.request(originalRequest);
			} catch (refreshError) {
				console.error('Error refreshing token:', refreshError);

				if (refreshError.response && refreshError.response.status === 401) {
					logout(); // Call logout function
				}

				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

axiosApi.interceptors.request.use(
	(config) => {
		accessToken = localStorage.getItem('accessToken');

		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
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
		// console.log('Error in POST request:', error);
		throw error;
	}
}

export async function postFile(url, formData, config = {}) {
	try {
		const response = await axiosApi.post(url, formData, {
			...config,
			headers: {
				'Content-Type': 'multipart/form-data',
				...config.headers,
			},
		});
		return response.data;
	} catch (error) {
		// console.log('Error in POST request:', error);
		throw error;
	}
}

export async function put(url, data, config = {}) {
	return axiosApi
		.put(url, { ...data }, { ...config })
		.then((response) => response.data);
}

export async function del(url, config = {}) {
	return await axiosApi
		.delete(url, { ...config })
		.then((response) => response.data);
}

export async function patch(url, data, config = {}) {
	try {
		const response = await axiosApi.patch(url, { ...data }, { ...config });
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
}
