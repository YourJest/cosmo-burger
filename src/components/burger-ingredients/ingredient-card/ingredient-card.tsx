import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store';
import { useDrag } from 'react-dnd';

interface IngredientCardProps {
	id: string;
	onClick?: (id: string) => void;
	count: number;
}

export const IngredientCard = ({ id, count, onClick }: IngredientCardProps) => {
	const [{ opacity }, draggableRef] = useDrag({
		type: 'ingredient',
		item: { id },
		collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
	});
	const ingredientInfo = useSelector((store: ApplicationStore) =>
		store.burgerConstructorReducer.availableIngredients.find(
			(ingredient) => ingredient._id === id
		)
	);

	if (!ingredientInfo) {
		return null;
	}

	return (
		<button
			ref={draggableRef}
			style={{ opacity }}
			className={styles.ingredientCard}
			onClick={() => onClick?.(ingredientInfo._id)}>
			<img src={ingredientInfo.image} alt={ingredientInfo.name} />
			<div className={styles.price}>
				<p className='text text_type_digits-default'>{ingredientInfo.price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p className={clsx(styles.name, 'text text_type_main-default')}>
				{ingredientInfo.name}
			</p>
			{count > 0 && (
				<div className={styles.counter}>
					<Counter count={count} />
				</div>
			)}
		</button>
	);
};
