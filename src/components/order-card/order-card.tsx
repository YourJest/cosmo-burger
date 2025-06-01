import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './order-card.module.scss';
import clsx from 'clsx';
import { useAppSelector } from '@components/app/hooks';
import { getAllIngredients } from '@services/norma/selectors';
import { useMemo } from 'react';
import { OrderEntry } from '@services/norma/order-feed';
import { Link, useLocation } from 'react-router-dom';
import { statusReadable } from '@utils/constant';

interface OrderCardProps {
	order: OrderEntry;
	shouldDisplayStatus?: boolean;
}

export const OrderCard = ({ order, shouldDisplayStatus }: OrderCardProps) => {
	const location = useLocation();

	const ingredients = useAppSelector(getAllIngredients);

	const orderIngredients = useMemo(() => {
		return order.ingredients
			.map((id) => ingredients.find((ingredient) => ingredient._id === id))
			.filter((i) => i !== undefined)
			.map((ingredient) => ({ ...ingredient, cardId: crypto.randomUUID() }));
	}, [order, ingredients]);

	const orderPrice = useMemo(() => {
		return order.ingredients.reduce(
			(prev, currId) =>
				(prev += ingredients.find((i) => i._id === currId)?.price ?? 0),
			0
		);
	}, [order, ingredients]);

	return (
		<Link
			to={`${location.pathname}/${order.number}`}
			state={{ background: location }}>
			<div className={clsx(css.OrderCard, 'p-6')}>
				<div className={css.numberAndDate}>
					<p className='text text_type_digits-default'>{`#${order.number}`}</p>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(order.createdAt)}
					/>
				</div>
				<div className={css.nameAndStatus}>
					<p className='text text_type_main-medium'>{order.name}</p>
					{shouldDisplayStatus && (
						<p className='text text_type_main-default'>
							{statusReadable[order.status]}
						</p>
					)}
				</div>
				<div className={css.ingredientsAndPrice}>
					<div className={css.ingredientsWrapper}>
						{orderIngredients.slice(0, 6).map((ingredient, i) => (
							<div
								key={ingredient?.cardId}
								className={css.ingredientImage}
								style={{ left: 44 * i, zIndex: 6 - i }}>
								<img
									className={css.image}
									src={ingredient?.image}
									alt={ingredient?.name}
								/>
								{i === 5 && orderIngredients.length > 6 && (
									<div className={css.more}>
										<p
											className={clsx(
												'text text_type_main-default',
												css.text
											)}>{`+${orderIngredients.length - 6}`}</p>
									</div>
								)}
							</div>
						))}
					</div>
					<div className={css.price}>
						<p className='text text_type_digits-default'>{orderPrice}</p>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		</Link>
	);
};
