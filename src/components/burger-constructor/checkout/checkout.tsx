import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './checkout.module.scss';
import clsx from 'clsx';
import { Modal } from '@components/modal/modal';
import { useState } from 'react';
import { OrderDetails } from '@components/order-details/order-details';
import { useLazyPlaceOrderQuery } from '@services/api/norma-api';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store';

export const Checkout = () => {
	const [openOrderStatus, setOpenOrderStatus] = useState(false);
	const order = useSelector(
		(store: ApplicationStore) =>
			store.burgerConstructorReducer.constructorIngredients
	);
	const [trigger] = useLazyPlaceOrderQuery();

	const toggleOpenOrderStatus = () => {
		setOpenOrderStatus(!openOrderStatus);
	};

	const handlePlaceOrder = () => {
		trigger({ ingredients: order.map((ingridient) => ingridient._id) });
		toggleOpenOrderStatus();
	};

	const totalPrice = 610;
	return (
		<div className={clsx('pl-5 pr-5', styles.checkout)}>
			<div className={styles.totalPrice}>
				<p className='text text_type_digits-default'>{totalPrice}</p>
				<CurrencyIcon type='primary' />
			</div>
			<Button htmlType='button' onClick={handlePlaceOrder}>
				Оформить заказ
			</Button>
			{openOrderStatus && (
				<Modal onClose={toggleOpenOrderStatus}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
