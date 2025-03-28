import styles from './burger-filling.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getBun, getIngredients } from '@services/burger-constructor/slice';
import clsx from 'clsx';
import { ConstructorIngredient } from '../constructor-ingredient/constructor-ingredient';
import { IngredientPlaceholder } from './ingredient-placeholder/ingredient-placeholder';
import { ConstructorBun } from '../constructor-bun/constructor-bun';

export const BurgerFilling = () => {
	const constructorIngredients = useSelector((state: RootState) =>
		getIngredients(state.burgerConstructor)
	);
	const bun = useSelector((state: RootState) =>
		getBun(state.burgerConstructor)
	);

	const ingredients = constructorIngredients?.filter(
		(ingredient) => ingredient.type !== 'bun'
	);

	return (
		<div className={clsx(styles.fillingWrapper)}>
			{bun ? (
				<ConstructorBun bun={bun} type='top' />
			) : (
				<IngredientPlaceholder type='top' text='Выберите булку' />
			)}
			<div className={styles.ingredients}>
				{ingredients.length > 0 ? (
					ingredients.map((ingredient, idx) => (
						<ConstructorIngredient
							key={ingredient.constructorId}
							index={idx}
							ingredient={ingredient}
						/>
					))
				) : (
					<IngredientPlaceholder type='main' text='Выберите ингредиенты' />
				)}
			</div>
			{bun ? (
				<ConstructorBun bun={bun} type='bottom' />
			) : (
				<IngredientPlaceholder type='bottom' text='Выберите булку' />
			)}
		</div>
	);
};
