import { create } from 'zustand';
import { postJwtLogin, postRefreshToken } from '@/helpers/backend_helper';

export const useAuthStore = create((set) => ({
	user: null,
	username: '',
	password: '',
	error: '',
	loading: false,
	accessToken: '',
	setUserCredentials: (username, password) => {
		set({ username, password });
	},
	login: async ({ user, history }) => {
		set({ loading: true, username: user.username });

		try {
			const { username, password } = user;

			const response = await postJwtLogin({
				username,
				password,
			});

			localStorage.setItem('username', username);
			localStorage.setItem('refreshToken', response.refresh);

			const refreshResponse = await postRefreshToken({
				refresh: response.refresh,
			});

			const accessToken = refreshResponse.access;
			set({ accessToken });

			if (accessToken) {
				history('/dashboard');
			} else {
				history('/no-access');
			}

			localStorage.setItem('accessToken', accessToken);
			set({ error: '' });
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errorMessage =
					'Логин и пароль недействительны. Пожалуйста, введите правильный логин и пароль!';
				set({ error: errorMessage });
			}

			if (error.response && error.response.status === 403) {
				const errorMessage =
					'В доступе отказано! Пожалуйста, обратитесь к Павлу для получения доступа!';
				set({ error: errorMessage });
			}

			if (error.response && error.response.status === 401) {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				// localStorage.removeItem('password');
				localStorage.removeItem('username');
				history('/login');
			}
		} finally {
			set({ loading: false });
		}
	},
	logout: async (history) => {
		set({ loading: true });

		try {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('user');
			localStorage.removeItem('username');
			history('/login');
		} catch (error) {
			set({ error });
		} finally {
			set({ user: null, loading: false });
		}
	},
}));
