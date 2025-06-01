import { createSelector } from '@reduxjs/toolkit';
import { normaApi } from './api';
import { RootState } from '../../store';
import { orderFeedApi } from './order-feed';

export const getAvailableIngredientsResult =
	normaApi.endpoints.getAvailableIngredients.select();

export const getAllIngredients = createSelector(
	getAvailableIngredientsResult,
	(getIngredientsResult) => getIngredientsResult?.data ?? []
);

export const getIngredientById = createSelector(
	getAllIngredients,
	(state: RootState, ingredientId: string) => ingredientId,
	(ingredients, ingredientId) =>
		ingredients.find((ingredient) => ingredient._id === ingredientId)
);

export const getAllOrderFeedMessage = orderFeedApi.endpoints.allFeed.select();

export const getAllOrders = createSelector(
	getAllOrderFeedMessage,
	(orderFeedResult) => orderFeedResult.data?.orders
);

export const getAllOrderByNumber = (orderNumber: string) =>
	createSelector(getAllOrders, (orders) =>
		orders?.find((order) => order.number === Number(orderNumber))
	);

export const getTotalOrders = createSelector(
	getAllOrderFeedMessage,
	(orderFeedResult) => orderFeedResult.data?.total
);

export const getTotalTodayOrders = createSelector(
	getAllOrderFeedMessage,
	(orderFeedResult) => orderFeedResult.data?.totalToday
);

export const getAllDoneOrders = createSelector(getAllOrders, (orders) =>
	orders?.filter((order) => order.status === 'done').map((o) => o.number)
);

export const getAllPendingOrders = createSelector(getAllOrders, (orders) =>
	orders?.filter((order) => order.status === 'pending').map((o) => o.number)
);

export const getUserOrderFeedMessage = orderFeedApi.endpoints.userFeed.select();

export const getUserOrders = createSelector(
	getUserOrderFeedMessage,
	(orderFeedResult) => orderFeedResult.data?.orders
);

export const getUserOrderByNumber = (orderNumber: string) =>
	createSelector(getUserOrders, (orders) =>
		orders?.find((order) => order.number === Number(orderNumber))
	);
