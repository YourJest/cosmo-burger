import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@services/norma/auth-api';

export interface UserState {
	user: {
		email: string | null;
		name: string | null;
	} | null;
}

export const initialState: UserState = {
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	selectors: {
		getName: (store) => store.user?.name,
		getUser: (store) => store.user,
	},
	extraReducers: (builder) => ({
		login: builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				state.user = action.payload.user;
			}
		),
		logout: builder.addMatcher(
			authApi.endpoints.logout.matchPending,
			(state) => {
				state.user = null;
			}
		),
		register: builder.addMatcher(
			authApi.endpoints.register.matchFulfilled,
			(state, action) => {
				state.user = action.payload.user;
			}
		),
		getUser: builder.addMatcher(
			authApi.endpoints.getUser.matchFulfilled,
			(state, action) => {
				state.user = action.payload.user;
			}
		),
		updateUser: builder.addMatcher(
			authApi.endpoints.updateUser.matchFulfilled,
			(state, action) => {
				state.user = action.payload.user;
			}
		),
	}),
});

export const reducer = userSlice.reducer;

export const { getName, getUser } = userSlice.selectors;
