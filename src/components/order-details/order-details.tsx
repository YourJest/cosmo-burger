import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.scss';
import clsx from 'clsx';
import { usePlaceOrderMutation } from '@services/norma/api';
import { WithLoader } from '@components/with-loader/with-loader';

export const OrderDetails = () => {
	const [, { isLoading, isError, data }] = usePlaceOrderMutation({
		fixedCacheKey: 'place-order',
	});

	return (
		<WithLoader
			isLoading={isLoading}
			hasError={isError}
			loadingMessage='Ваш заказ формируется'>
			<div className={clsx('pt-5 pb-5', styles.orderDetails)}>
				<div className={styles.orderId}>
					<p
						data-cy={'order-number'}
						className={clsx(styles.orderNumber, 'text text_type_digits-large')}>
						{data?.order.number}
					</p>
					<p className={'text text_type_main-small'}>идентификатор заказа</p>
				</div>
				<div className={styles.confirmIcon}>
					<CheckMarkIcon type='primary' />
				</div>
				<div className={styles.orderStatus}>
					<p className='text text_type_main-small'>Ваш заказ начали готовить</p>
					<p className='text text_type_main-small text_color_inactive'>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			</div>
		</WithLoader>
	);
};
