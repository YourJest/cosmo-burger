import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './checkout.module.scss';
import clsx from 'clsx';
import { Modal } from '@components/modal/modal';
import { useState } from 'react';
import { OrderDetails } from '@components/order-details/order-details';

export const Checkout = () => {
	const [openOrderStatus, setOpenOrderStatus] = useState(false);
	const toggleOpenOrderStatus = () => {
		setOpenOrderStatus(!openOrderStatus);
	};
	const totalPrice = 610;
	return (
		<div className={clsx('pl-5 pr-5', styles.checkout)}>
			<div className={styles.totalPrice}>
				<p className='text text_type_digits-default'>{totalPrice}</p>
				<CurrencyIcon type='primary' />
			</div>
			<Button htmlType='button' onClick={toggleOpenOrderStatus}>
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
