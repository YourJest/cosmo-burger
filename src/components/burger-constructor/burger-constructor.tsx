import clsx from 'clsx';
import styles from './burger-constructor.module.scss';
import { BurgerFilling } from './burger-ingridients.tsx/burger-filling';
import { Checkout } from './checkout/checkout';

export const BurgerConstructor = () => {
	return (
		<section className={clsx('pt-25', styles.burgerConstructor)}>
			<BurgerFilling />
			<Checkout />
		</section>
	);
};
