import css from './feed.module.scss';
import { useAllFeedQuery } from '@services/norma/order-feed';
import { useAppSelector } from '@components/app/hooks';
import { getAllOrders } from '@services/norma/selectors';
import { OrderList } from '@components/order-list/order-list';
import { OrderFeedStats } from '@components/order-feed-stats/order-feed-stats';

export const FeedPage = () => {
	useAllFeedQuery();
	const orders = useAppSelector(getAllOrders);

	return (
		<main className={css.FeedPage}>
			<div className={css.feedPanel}>
				<section className={css.orderListSection}>
					<p className='text text_type_main-large'>Лента заказов</p>
					<OrderList orders={orders} shouldDisplayStatus />
				</section>
				<section className={css.ordersStatsSection}>
					<OrderFeedStats />
				</section>
			</div>
		</main>
	);
};
