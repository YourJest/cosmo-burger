import clsx from 'clsx';
import styles from './ingredient-placeholder.module.scss';
import { useDrop } from 'react-dnd';
import { DraggableIngredientType } from '@utils/constant';
import {
	addBunToConstructor,
	addIngredientToConstructor,
	IngredientEntry,
} from '@services/burger-constructor/slice';
import { useAppDispatch } from '@components/app/hooks';

interface IngredientPlaceholderProps {
	type: 'top' | 'main' | 'bottom';
	text: string;
}
export const IngredientPlaceholder = ({
	type,
	text,
}: IngredientPlaceholderProps) => {
	const dispatch = useAppDispatch();
	const [{ isHover }, droppableRef] = useDrop<
		IngredientEntry,
		void,
		{ isHover: boolean }
	>({
		accept:
			type === 'main'
				? DraggableIngredientType.IngredientCard
				: DraggableIngredientType.IngredientCardBun,
		drop: (item) => {
			if (item.type === 'bun') {
				dispatch(addBunToConstructor(item));
			} else {
				dispatch(addIngredientToConstructor(item));
			}
		},
		collect: (monitor) => ({ isHover: monitor.isOver() }),
	});
	return (
		<div
			ref={droppableRef}
			data-cy={`drop-${type}`}
			className={clsx(
				'ml-8',
				styles.ingredientPlaceholder,
				styles[type],
				isHover && styles.dropHover
			)}>
			<p className='text text_type_main-default'>{text}</p>
		</div>
	);
};
