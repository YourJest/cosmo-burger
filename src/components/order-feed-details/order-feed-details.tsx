import { useAppSelector } from '@components/app/hooks';
import {
	getAllIngredients,
	getAllOrderByNumber,
	getUserOrderByNumber,
} from '@services/norma/selectors';
import { useLocation, useParams } from 'react-router-dom';
import css from './order-feed-details.module.scss';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Pages, statusReadable } from '@utils/constant';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { IngredientEntry } from '@services/burger-constructor/slice';
import { useLazyGetOrderQuery } from '@services/norma/order-feed';

export const OrderFeedDetails = () => {
	const { number } = useParams();
	const { pathname } = useLocation();
	const [trigger, { data }] = useLazyGetOrderQuery();
	const socketOrder = useAppSelector(
		pathname.includes(Pages.ORDER_FEED)
			? getAllOrderByNumber(number ?? '')
			: getUserOrderByNumber(number ?? '')
	);

	useEffect(() => {
		if (!socketOrder) {
			trigger(number ?? '');
		}
	}, [socketOrder, trigger, number]);

	const ingredients = useAppSelector(getAllIngredients);

	const orderPrice = useMemo(() => {
		const order = socketOrder ?? data;
		if (!order) {
			return;
		}
		return order.ingredients.reduce(
			(prev, currId) =>
				(prev += ingredients?.find((i) => i._id === currId)?.price ?? 0),
			0
		);
	}, [socketOrder, ingredients, data]);

	const orderIngredients = useMemo(() => {
		const result = new Map<string, IngredientEntry & { count: number }>();
		const order = socketOrder ?? data;
		if (!order) {
			return;
		}
		for (const ingredientId of order.ingredients) {
			if (!result.has(ingredientId)) {
				const ingredient = ingredients.find((ing) => ing._id === ingredientId);
				if (!ingredient) {
					return;
				}
				result.set(ingredientId, {
					...ingredient,
					count: 1,
				});
			} else {
				const ingredient = result.get(ingredientId);
				if (!ingredient) {
					return;
				}
				result.set(ingredientId, {
					...ingredient,
					count: ingredient.count + 1,
				});
			}
		}
		return result;
	}, [socketOrder, ingredients, data]);

	const displayOrder = socketOrder ?? data;

	if (!displayOrder) {
		return (
			<div className={css.OrderFeedDetails}>
				<p className='text text_type_main-medium'>Заказ не найден</p>
			</div>
		);
	}

	return (
		<div className={css.OrderFeedDetails}>
			<p className={clsx('text text_type_digits-default', css.orderNumber)}>
				#{displayOrder.number}
			</p>
			<p className='pt-10 text text_type_main-medium'>{displayOrder.name}</p>
			<p className='pt-3 text text_type_main-default'>
				{statusReadable[displayOrder.status]}
			</p>
			<p className='pt-15 text text_type_main-medium'>Состав:</p>
			<div className={clsx('pt-6 pr-6', css.orderIngredients)}>
				{orderIngredients &&
					[...orderIngredients].map(([key, value]) => (
						<div key={key} className={css.ingredient}>
							<div className={css.imageAndName}>
								<div className={css.ingredientImage}>
									<img
										src={value.image}
										className={css.image}
										alt={value.name}
									/>
								</div>
								<p className='text text_type_main-default'>{value.name}</p>
							</div>
							<div className={css.countAndPrice}>
								<p className='text text_type_digits-default'>{`${value.count} x ${value.price}`}</p>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					))}
			</div>
			<div className={clsx('pt-10', css.dateAndPrice)}>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(displayOrder.createdAt)}
				/>
				<div className={css.price}>
					<p className='text text_type_digits-default'>{orderPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
