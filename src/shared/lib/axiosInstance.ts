import axios from 'axios';

export const axiosInstance = axios.create({
	// baseURL: process.env.NEXT_PUBLIC_API_URL,
	baseURL: '/api/',
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token =
			typeof window !== 'undefined'
				? localStorage.getItem('access_token')
				: null;

		config.headers = config.headers ?? {};
		if (token) config.headers.Authorization = token;
		return config;
	},
	(error) => Promise.reject(error),
);
