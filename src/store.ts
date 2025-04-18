import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { normaApi } from '@services/norma/api';
import { burgerConstructorSlice } from '@services/burger-constructor/slice';
import { userSlice } from '@services/user/slice';

const rootReducer = combineSlices(burgerConstructorSlice, userSlice, normaApi);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(normaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
