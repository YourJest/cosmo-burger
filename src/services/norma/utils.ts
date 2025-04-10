import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

interface TokenErrorResponse {
	success: boolean;
	message: string;
}

interface TokenRefreshSuccessResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

const baseQuery = fetchBaseQuery({
	baseUrl: 'https://norma.nomoreparties.space/api/',
	prepareHeaders: (headers) => {
		const token = localStorage.getItem('accessToken');
		if (!token) {
			return;
		}
		headers.set('Authorization', token);
	},
});

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, store, extraOptions) => {
	let result = await baseQuery(args, store, extraOptions);
	if (
		(result.error?.data as TokenErrorResponse)?.message === 'jwt expired' &&
		result.error?.status === 403
	) {
		const token = localStorage.getItem('refreshToken');
		const refreshResult = await baseQuery(
			{
				url: 'auth/token',
				method: 'POST',
				body: {
					token,
				},
			},
			store,
			extraOptions
		);
		if (refreshResult.data) {
			const { refreshToken, accessToken } =
				refreshResult.data as TokenRefreshSuccessResponse;
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			// Retry the original request
			result = await baseQuery(args, store, extraOptions);
		}
	}
	if ((result.error?.data as TokenErrorResponse)?.message === 'invalid token') {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}
	return result;
};
