import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	addBunToConstructor,
	IngredientEntry,
} from '@services/burger-constructor/slice';
import styles from './constructor-bun.module.scss';
import { useDrop } from 'react-dnd';
import { DraggableIngredientType } from '@utils/constant';
import clsx from 'clsx';
import { useAppDispatch } from '@components/app/hooks';

interface ConstructorBunProps {
	type: 'top' | 'bottom';
	bun: IngredientEntry;
}

export const ConstructorBun = ({ bun, type }: ConstructorBunProps) => {
	const dispatch = useAppDispatch();
	const [{ handlerId }, dropRef] = useDrop<
		IngredientEntry,
		void,
		{ handlerId: string | symbol | null }
	>({
		accept: DraggableIngredientType.IngredientCardBun,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		drop: (item) => {
			dispatch(addBunToConstructor(item));
		},
	});

	return (
		<div
			ref={dropRef}
			data-cy={`constructor-bun-${type}`}
			className={clsx('ml-8', styles.bun)}
			data-handler-id={handlerId}>
			{!type && <DragIcon type='primary' />}
			<ConstructorElement
				price={bun.price}
				text={bun.name}
				thumbnail={bun.image}
				type={type}
				isLocked
			/>
		</div>
	);
};
