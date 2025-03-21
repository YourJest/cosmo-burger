import styles from './ingredient-list.module.scss';
import { RefObject, useState } from 'react';
import clsx from 'clsx';
import { IngredientCategory } from '../ingredient-category/ingredient-category';

import { WithLoader } from '@components/with-loader/with-loader';
import { useGetAvailableIngredientsQuery } from '@services/api/norma-api';
import { useSelector } from 'react-redux';
import { ApplicationStore } from '../../../store';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { IngredientEntry } from '@services/slices/burger-constructor-slice';

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
	const { isFetching: isLoadingIngredients, isError: hasErrorIngredients } =
		useGetAvailableIngredientsQuery();
	const ingredientsData = useSelector(
		(store: ApplicationStore) =>
			store.burgerConstructorReducer.availableIngredients
	);
	const [openIngredientDetails, setOpenIngredientDetails] = useState(false);
	const [ingredientInfo, setIngredientInfo] = useState<
		IngredientEntry | undefined
	>();

	const closeIngredientDetails = () => {
		setOpenIngredientDetails(false);
		setIngredientInfo(undefined);
	};
	const openIngredientsDetails = (id: string) => {
		setOpenIngredientDetails(!openIngredientDetails);
		setIngredientInfo(
			ingredientsData.find((ingredient) => ingredient._id === id)
		);
	};

	return (
		<div className={clsx('pt-10', styles.ingredientList)}>
			<WithLoader
				isLoading={isLoadingIngredients}
				hasError={hasErrorIngredients}>
				{ingredientsData && (
					<>
						<IngredientCategory
							name='Булки'
							nameRef={bunsRef}
							onOpenDetails={openIngredientsDetails}
							ingredients={ingredientsData.filter(
								(ingredient) => ingredient.type === 'bun'
							)}
						/>
						<IngredientCategory
							name='Соусы'
							nameRef={sauceRef}
							onOpenDetails={openIngredientsDetails}
							ingredients={ingredientsData.filter(
								(ingredient) => ingredient.type === 'sauce'
							)}
						/>
						<IngredientCategory
							name='Начинки'
							nameRef={mainRef}
							onOpenDetails={openIngredientsDetails}
							ingredients={ingredientsData.filter(
								(ingredient) => ingredient.type === 'main'
							)}
						/>
					</>
				)}
				{openIngredientDetails && ingredientInfo && (
					<Modal title='Детали ингредиента' onClose={closeIngredientDetails}>
						<IngredientDetails ingredientInfo={ingredientInfo} />
					</Modal>
				)}
			</WithLoader>
		</div>
	);
};
