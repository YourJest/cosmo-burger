import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import {
	addIngredientToConstructor,
	ConstructorEntry,
	removeIngredientFromConstructor,
	reorderConstructorIngredient,
} from '@services/burger-constructor/slice';
import styles from './constructor-ingredient.module.scss';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { DraggableIngredientType } from '@utils/constant';
import { useRef } from 'react';

interface ConstructorIngredientProps {
	ingredient: ConstructorEntry;
	index: number;
}

type EntryWithIndex = ConstructorIngredientProps['ingredient'] & {
	index?: number;
};

export const ConstructorIngredient = ({
	ingredient,
	index,
}: ConstructorIngredientProps) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop<
		EntryWithIndex,
		void,
		{ handlerId: string | symbol | null }
	>({
		accept: [
			DraggableIngredientType.IngredientCard,
			DraggableIngredientType.ConstructorIngredient,
		],
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: EntryWithIndex, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (
				monitor.getItemType() === DraggableIngredientType.IngredientCard ||
				typeof dragIndex !== 'number'
			) {
				return;
			}
			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			dispatch(
				reorderConstructorIngredient({
					fromIndex: dragIndex,
					toIndex: hoverIndex,
				})
			);
			item.index = hoverIndex;
		},
		drop: (item, monitor) => {
			const dropItemType = monitor.getItemType();
			if (dropItemType === DraggableIngredientType.ConstructorIngredient) {
				return;
			}
			dispatch(addIngredientToConstructor(item));
		},
	});

	const [{ opacity }, drag] = useDrag({
		type: DraggableIngredientType.ConstructorIngredient,
		item: (): EntryWithIndex => {
			return { ...ingredient, index };
		},
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	drag(drop(ref));

	return (
		<div
			style={{ opacity }}
			ref={ref}
			className={styles.ingredient}
			data-handler-id={handlerId}>
			<DragIcon type='primary' />
			<ConstructorElement
				price={ingredient.price}
				text={ingredient.name}
				thumbnail={ingredient.image}
				handleClose={() =>
					dispatch(removeIngredientFromConstructor(ingredient.constructorId))
				}
			/>
		</div>
	);
};
