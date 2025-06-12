import { useAppSelector } from '@components/app/hooks';
import { OrderList } from '@components/order-list/order-list';
import { useUserFeedQuery } from '@services/norma/order-feed';
import { getUserOrders } from '@services/norma/selectors';

export const ProfileOrders = () => {
	useUserFeedQuery();
	const orders = useAppSelector(getUserOrders);

	return <OrderList orders={orders} />;
};
