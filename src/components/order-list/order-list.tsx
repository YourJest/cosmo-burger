import { OrderCard } from '@components/order-card/order-card';
import { OrderEntry } from '@services/norma/order-feed';
import css from './order-list.module.scss';

interface OrderListProps {
	orders?: OrderEntry[];
	shouldDisplayStatus?: boolean;
}
export const OrderList = ({ orders, shouldDisplayStatus }: OrderListProps) => {
	return (
		<div className={css.orderList}>
			{orders &&
				orders.map((entry) => {
					return (
						<OrderCard
							key={entry._id}
							order={entry}
							shouldDisplayStatus={shouldDisplayStatus}
						/>
					);
				})}
		</div>
	);
};
