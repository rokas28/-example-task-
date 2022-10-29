import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
	baseURL: 'https://playground.oxylabs.io/api',
});

instance.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		const token = localStorage.getItem('TOKEN');

		if (config.headers && token) {
			config.headers['x-access-token'] = token;
		}

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;
