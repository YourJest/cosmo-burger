import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.scss';
import clsx from 'clsx';

export const OrderDetails = () => {
	return (
		<div className={clsx('pt-5 pb-5', styles.orderDetails)}>
			<div className={styles.orderId}>
				<p className={clsx(styles.orderNumber, 'text text_type_digits-large')}>
					034536
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
	);
};
