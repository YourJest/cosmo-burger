import { useAppSelector } from '@components/app/hooks';
import css from './order-feed-stats.module.scss';
import {
	getAllDoneOrders,
	getAllPendingOrders,
	getTotalOrders,
	getTotalTodayOrders,
} from '@services/norma/selectors';
import clsx from 'clsx';

export const OrderFeedStats = () => {
	const doneOrders = useAppSelector(getAllDoneOrders);
	const pendingOrders = useAppSelector(getAllPendingOrders);
	const totalOrders = useAppSelector(getTotalOrders);
	const totalTodayOrders = useAppSelector(getTotalTodayOrders);

	return (
		<div className={css.OrderFeedStats}>
			<div className={css.orderNumbers}>
				<div>
					<p className='text text_type_main-medium'>Готовы:</p>
					<div className={css.numberList}>
						{doneOrders?.slice(0, 10)?.map((order) => (
							<p
								className={clsx(
									'text text_type_digits-default',
									css.successOrder
								)}
								key={order}>
								{order}
							</p>
						))}
					</div>
				</div>
				<div>
					<p className='text text_type_main-medium'>В работе:</p>
					<div className={css.numberList}>
						{pendingOrders?.slice(0, 10)?.map((order) => (
							<p className='text text_type_digits-default' key={order}>
								{order}
							</p>
						))}
					</div>
				</div>
			</div>
			<div>
				<p className='text text_type_main-medium'>Выполнено за всё время:</p>
				<p className={clsx('text text_type_digits-large', css.totalNumber)}>
					{totalOrders}
				</p>
			</div>
			<div>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<p className={clsx('text text_type_digits-large', css.totalNumber)}>
					{totalTodayOrders}
				</p>
			</div>
		</div>
	);
};
