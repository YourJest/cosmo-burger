import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './checkout.module.scss';
import clsx from 'clsx';

export const Checkout = () => {
	const totalPrice = 610;
	return (
		<div className={clsx('pl-5 pr-5', styles.checkout)}>
			<div className={styles.totalPrice}>
				<p className='text text_type_digits-default'>{totalPrice}</p>
				<CurrencyIcon type='primary' />
			</div>
			<Button htmlType='button'>Оформить заказ</Button>
		</div>
	);
};
