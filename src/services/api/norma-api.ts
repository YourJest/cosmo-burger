import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IngredientEntry } from '@services/slices/burger-constructor-slice';

interface IngredientsResponse {
	data: IngredientEntry[];
	success: boolean;
}

interface PlaceOrderResponse {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

interface PlaceOrderRequest {
	ingredients: string[];
}

export const normaApi = createApi({
	reducerPath: 'normaApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://norma.nomoreparties.space/api/',
	}),
	endpoints: (builder) => ({
		getAvailableIngredients: builder.query<IngredientEntry[], void>({
			query: () => '/ingredients',
			transformResponse: (response: IngredientsResponse) => response.data,
		}),
		placeOrder: builder.query<PlaceOrderResponse, PlaceOrderRequest>({
			query: (body) => ({ url: '/orders', method: 'POST', body }),
		}),
	}),
});

export const { useGetAvailableIngredientsQuery, useLazyPlaceOrderQuery } =
	normaApi;
