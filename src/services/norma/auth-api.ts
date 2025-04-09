import { normaApi } from './api';

interface LoginRequest {
	email: string;
	password: string;
}

interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

interface ForgotPasswordRequest {
	email: string;
}

interface ResetPasswordRequest {
	password: string;
	// Это токен, который пришёл в письме
	token: string;
}

interface UserResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
}

interface LogoutResponse {
	success: boolean;
	message: string;
}

export const authApi = normaApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<UserResponse, RegisterRequest>({
			query: (body) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem('accessToken', data.accessToken);
					localStorage.setItem('refreshToken', data.refreshToken);
				} catch (e) {
					console.error(e);
				}
			},
		}),
		login: builder.mutation<UserResponse, LoginRequest>({
			query: (body) => ({ url: '/auth/login', method: 'POST', body }),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const { data } = await queryFulfilled;
					localStorage.setItem('accessToken', data.accessToken);
					localStorage.setItem('refreshToken', data.refreshToken);
				} catch (e) {
					console.error(e);
				}
			},
		}),
		forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
			query: (body) => ({ url: '/password-reset', method: 'POST', body }),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					localStorage.setItem('resetPasswordRequested', 'true');
				} catch (e) {
					console.error(e);
				}
			},
		}),
		resetPassword: builder.mutation<void, ResetPasswordRequest>({
			query: (body) => ({
				url: '/password-reset/reset',
				method: 'POST',
				body,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					localStorage.removeItem('resetPasswordRequested');
				} catch (e) {
					console.error(e);
				}
			},
		}),
		logout: builder.mutation<LogoutResponse, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'POST',
				body: {
					token: localStorage.getItem('refreshToken'),
				},
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					await queryFulfilled;
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
				} catch (e) {
					console.error(e);
				}
			},
		}),
		getUser: builder.query<UserResponse, void>({
			query: () => ({ url: '/auth/user', method: 'GET' }),
		}),
	}),
});

export const {
	useGetUserQuery,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useLoginMutation,
	useRegisterMutation,
	useLogoutMutation,
} = authApi;
