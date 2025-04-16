import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './checkout.module.scss';
import clsx from 'clsx';
import { Modal } from '@components/modal/modal';
import { useState } from 'react';
import { OrderDetails } from '@components/order-details/order-details';
import { usePlaceOrderMutation } from '@services/norma/api';
import {
	getOrder,
	getTotalPrice,
} from '@services/burger-constructor/selectors';
import { getUser } from '@services/user/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pages } from '@utils/constant';
import { useAppSelector } from '@components/app/hooks';

export const Checkout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const order = useAppSelector(getOrder);
	const totalPrice = useAppSelector(getTotalPrice);
	const user = useAppSelector(getUser);

	const [triggerPlaceOrder] = usePlaceOrderMutation({
		fixedCacheKey: 'place-order',
	});

	const [openOrderStatus, setOpenOrderStatus] = useState(false);

	const toggleOpenOrderStatus = () => {
		setOpenOrderStatus(!openOrderStatus);
	};

	const handlePlaceOrder = () => {
		if (!user) {
			navigate(Pages.LOGIN, { state: { from: location } });
			return;
		}
		triggerPlaceOrder({ ingredients: order });
		toggleOpenOrderStatus();
	};

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
