import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.scss';
import clsx from 'clsx';
import { useDrag } from 'react-dnd';
import { DraggableIngredientType } from '@utils/constant';
import {
	getIngredientCount,
	IngredientEntry,
} from '@services/burger-constructor/slice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { setSelectedIngredient } from '@services/selected-ingredient/slice';

interface IngredientCardProps {
	ingredient: IngredientEntry;
}

export const IngredientCard = ({ ingredient }: IngredientCardProps) => {
	const count = useSelector((state: RootState) =>
		getIngredientCount(state.burgerConstructor, ingredient._id, ingredient.type)
	);
	const dispatch = useDispatch();

	const [{ opacity }, draggableRef] = useDrag({
		type:
			ingredient.type === 'bun'
				? DraggableIngredientType.IngredientCardBun
				: DraggableIngredientType.IngredientCard,
		item: { ...ingredient },
		collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
	});

	const handleSetSelectedElement = () => {
		dispatch(setSelectedIngredient(ingredient));
	};

	return (
		<div
			ref={draggableRef}
			style={{ opacity }}
			className={styles.ingredientCard}
			onClick={handleSetSelectedElement}>
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
	);
};
