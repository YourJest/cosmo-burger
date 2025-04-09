import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@services/norma/auth-api';

interface UserState {
	email: string | null;
	name: string | null;
}

const initialState: UserState = {
	email: null,
	name: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	selectors: {
		getName: (store) => store.name,
	},
	extraReducers: (builder) => ({
		login: builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
			}
		),
		logout: builder.addMatcher(
			authApi.endpoints.logout.matchFulfilled,
			(state) => {
				state.email = null;
				state.name = null;
			}
		),
		register: builder.addMatcher(
			authApi.endpoints.register.matchFulfilled,
			(state, action) => {
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
			}
		),
		getUser: builder.addMatcher(
			authApi.endpoints.getUser.matchFulfilled,
			(state, action) => {
				state.email = action.payload.user.email;
				state.name = action.payload.user.name;
			}
		),
	}),
});

export const { getName } = userSlice.selectors;
