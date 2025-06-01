import { normaApi } from './api';
import { authApi } from './auth-api';

export interface OrderEntry {
	ingredients: readonly string[];
	_id: string;
	status: 'done' | 'created' | 'pending';
	number: number;
	createdAt: string;
	updatedAt: string;
	name: string;
}

export interface OrderFeedResponse {
	success: boolean;
	orders: OrderEntry[];
	total: number;
	totalToday: number;
}

export const orderFeedApi = normaApi.injectEndpoints({
	endpoints: (builder) => ({
		getOrder: builder.query<OrderEntry, string>({
			query: (arg) => `https://norma.nomoreparties.space/api/orders/${arg}`,
			transformResponse: (response: OrderFeedResponse) => response.orders[0],
		}),
		allFeed: builder.query<OrderFeedResponse, void>({
			queryFn: () => {
				return {
					data: { success: true, orders: [], total: 0, totalToday: 0 },
				};
			},
			keepUnusedDataFor: 0,
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
				await cacheDataLoaded;

				const listener = (event: MessageEvent) => {
					const data = JSON.parse(event.data);
					if (!data.success) {
						return;
					}

					updateCachedData(() => data);
				};

				ws.addEventListener('message', listener);

				await cacheEntryRemoved;
				ws.close();
			},
		}),
		userFeed: builder.query<OrderFeedResponse, void>({
			queryFn: () => {
				return {
					data: { success: true, orders: [], total: 0, totalToday: 0 },
				};
			},
			keepUnusedDataFor: 0,
			async onCacheEntryAdded(
				arg,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
			) {
				await cacheDataLoaded;
				let socket: WebSocket | null = null;

				const connect = async () => {
					const token = localStorage
						.getItem('accessToken')
						?.replace('Bearer ', '');

					if (!token) {
						console.error('Токен не получен');
						return null;
					}

					const ws = new WebSocket(
						`wss://norma.nomoreparties.space/orders?token=${token}`
					);
					return ws;
				};

				const listener = async (event: MessageEvent) => {
					const data = JSON.parse(event.data);
					if (!data.success && data.message === 'Invalid or missing token') {
						socket?.removeEventListener('message', listener);
						socket?.close();

						await dispatch(
							authApi.endpoints.getUser.initiate(undefined, {
								forceRefetch: true,
							})
						);

						socket = await connect();
						if (socket) {
							socket.addEventListener('message', listener);
						}

						return;
					}

					updateCachedData(() => data);
				};
				socket = await connect();
				if (!socket) {
					return;
				}
				socket.addEventListener('message', listener);
				await cacheEntryRemoved;

				socket?.removeEventListener('message', listener);
				socket?.close();
			},
		}),
	}),
});
export const { useAllFeedQuery, useUserFeedQuery, useLazyGetOrderQuery } =
	orderFeedApi;
