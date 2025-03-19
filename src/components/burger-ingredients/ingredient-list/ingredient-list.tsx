import styles from './ingredient-list.module.scss';
import { RefObject } from 'react';
import clsx from 'clsx';
import { IngredientCategory } from '../ingredient-category/ingredient-category';

import { WithLoader } from '@components/with-loader/with-loader';
import { useGetAvailableIngredientsQuery } from '@services/api/norma-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface IngredientListProps {
	bunsRef: RefObject<HTMLDivElement>;
	sauceRef: RefObject<HTMLDivElement>;
	mainRef: RefObject<HTMLDivElement>;
}

export const IngredientList = ({
	bunsRef,
	sauceRef,
	mainRef,
}: IngredientListProps) => {
	const { isFetching: isLoadingIngredients, isError: hasErrorIngrindents } =
		useGetAvailableIngredientsQuery();
	const ingredientsData = useSelector(
		(store: RootState) => store.burgerConstructorReducer.availableIngredients
	);
	return (
		<div className={clsx('pt-10', styles.ingredientList)}>
			<WithLoader
				isLoading={isLoadingIngredients}
				hasError={hasErrorIngrindents}>
				{ingredientsData && (
					<>
						<IngredientCategory
							name='Булки'
							nameRef={bunsRef}
							ingredients={ingredientsData.filter(
								(ingredient) => ingredient.type === 'bun'
							)}
						/>
						<IngredientCategory
							name='Соусы'
							nameRef={sauceRef}
							ingredients={ingredientsData.filter(
								(ingredient) => ingredient.type === 'sauce'
							)}
						/>
						<IngredientCategory
							name='Начинки'
							nameRef={mainRef}
							ingredients={ingredientsData.filter(
								(ingredient) => ingredient.type === 'main'
							)}
						/>
					</>
				)}
			</WithLoader>
		</div>
	);
};
