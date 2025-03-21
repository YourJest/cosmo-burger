import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.scss';
import clsx from 'clsx';
import { normaApi } from '@services/api/norma-api';
import { WithLoader } from '@components/with-loader/with-loader';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../store';

export const OrderDetails = () => {
	const ingredients = useSelector(
		(store: ApplicationStore) =>
			store.burgerConstructorReducer.constructorIngredients
	);
	const { isFetching, isError, data } =
		normaApi.endpoints.placeOrder.useQueryState({
			ingredients: ingredients.map((ingredient) => ingredient._id),
		});

	return (
		<WithLoader isLoading={isFetching} hasError={isError}>
			<div className={clsx('pt-5 pb-5', styles.orderDetails)}>
				<div className={styles.orderId}>
					<p
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
