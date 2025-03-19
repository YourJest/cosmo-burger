import { configureStore } from '@reduxjs/toolkit';
import { normaApi } from '@services/api/norma-api';
import burgerConstructorReducer from '@services/slices/burger-constructor-slice';
import orderReducer from '@services/slices/order-slice';

export const store = configureStore({
	reducer: {
		[normaApi.reducerPath]: normaApi.reducer,
		burgerConstructorReducer,
		orderReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(normaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
