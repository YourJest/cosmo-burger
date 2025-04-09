import { createApi } from '@reduxjs/toolkit/query/react';
import { IngredientEntry } from '@services/burger-constructor/slice';
import { baseQueryWithReauth } from './utils';

interface IngredientsResponse {
	data: IngredientEntry[];
	success: boolean;
}

interface PlaceOrderRequest {
	ingredients: string[];
}

interface PlaceOrderResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export const normaApi = createApi({
	reducerPath: 'normaApi',
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({
		getAvailableIngredients: builder.query<IngredientEntry[], void>({
			query: () => '/ingredients',
			transformResponse: (response: IngredientsResponse) => response.data,
		}),
		placeOrder: builder.mutation<PlaceOrderResponse, PlaceOrderRequest>({
			query: (body) => ({
				url: '/orders',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useGetAvailableIngredientsQuery, usePlaceOrderMutation } =
	normaApi;
