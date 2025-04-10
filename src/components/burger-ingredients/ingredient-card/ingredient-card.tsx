import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.scss';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';
import { DraggableIngredientType, Pages } from '@utils/constant';
import {
	getIngredientCount,
	IngredientEntry,
} from '@services/burger-constructor/slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Link, useLocation } from 'react-router-dom';

interface IngredientCardProps {
	ingredient: IngredientEntry;
}

export const IngredientCard = ({ ingredient }: IngredientCardProps) => {
	const location = useLocation();
	const count = useSelector((state: RootState) =>
		getIngredientCount(state.burgerConstructor, ingredient._id, ingredient.type)
	);

	const [{ opacity }, draggableRef] = useDrag({
		type:
			ingredient.type === 'bun'
				? DraggableIngredientType.IngredientCardBun
				: DraggableIngredientType.IngredientCard,
		item: { ...ingredient },
		collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
	});

	return (
		<Link
			to={Pages.INGREDIENTS.replace(':ingredientId', ingredient._id)}
			state={{ background: location }}>
			<div
				ref={draggableRef}
				style={{ opacity }}
				className={styles.ingredientCard}>
				<img src={ingredient.image} alt={ingredient.name} />
				<div className={styles.price}>
					<p className='text text_type_digits-default'>{ingredient.price}</p>
					<CurrencyIcon type='primary' />
				</div>
				<p className={clsx(styles.name, 'text text_type_main-default')}>
					{ingredient.name}
				</p>
				{count > 0 && (
					<div className={styles.counter}>
						<Counter count={count} />
					</div>
				)}
			</div>
		</Link>
	);
};
