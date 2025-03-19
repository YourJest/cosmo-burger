import { createSlice } from '@reduxjs/toolkit';
import { normaApi } from '@services/api/norma-api';

interface OrderState {
	orderNumber: null | number;
	orderName: string | undefined;
}

const initialState: OrderState = {
	orderNumber: null,
	orderName: '',
};

export const orderSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			normaApi.endpoints.placeOrder.matchFulfilled,
			(state, { payload }) => {
				state.orderNumber = payload.order.number;
			}
		);
	},
});

export default orderSlice.reducer;
