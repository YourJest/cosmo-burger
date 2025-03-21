import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-filling.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, ApplicationStore } from '../../../store';
import { useDrop } from 'react-dnd';
import {
	addIngredientToConstructor,
	removeIngredientFromConstructor,
} from '@services/slices/burger-constructor-slice';
import clsx from 'clsx';

export const BurgerFilling = () => {
	const { constructorIngredients } = useSelector(
		(store: ApplicationStore) => store.burgerConstructorReducer
	);
	const dispatch = useDispatch<AppDispatch>();

	const [{ isHover }, dropRef] = useDrop({
		accept: ['ingredient'],
		drop: (item: { id: string }) => {
			dispatch(addIngredientToConstructor(item.id));
		},
		collect: (monitor) => ({ isHover: monitor.isOver() }),
	});

	const ingredients = constructorIngredients.filter(
		(ingredient) => ingredient.type !== 'bun'
	);

	const bun = constructorIngredients?.find(
		(ingredient) => ingredient.type === 'bun'
	);

	return (
		<div
			ref={dropRef}
			className={clsx(styles.fillingWrapper, isHover && styles.dropHover)}>
			{bun && (
				<div className={'pl-8'}>
					<ConstructorElement
						price={bun.price}
						text={`${bun.name} (верх)`}
						thumbnail={bun.image}
						type='top'
						extraClass={styles.bun}
						isLocked
					/>
				</div>
			)}
			<div className={styles.ingredients}>
				{ingredients?.map((ingredient) => (
					<div key={ingredient._id} className={styles.ingredient}>
						<DragIcon type='primary' />
						<ConstructorElement
							price={ingredient.price}
							text={ingredient.name}
							thumbnail={ingredient.image}
							handleClose={() =>
								dispatch(removeIngredientFromConstructor(ingredient._id))
							}
						/>
					</div>
				))}
			</div>
			{bun && (
				<div className={'pl-8'}>
					<ConstructorElement
						price={bun.price}
						text={`${bun.name} (низ)`}
						thumbnail={bun.image}
						type='bottom'
						isLocked
					/>
				</div>
			)}
		</div>
	);
};
