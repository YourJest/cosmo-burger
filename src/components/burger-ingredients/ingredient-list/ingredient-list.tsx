import styles from './ingredient-list.module.scss';
import { RefObject, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { IngredientCategory } from '../ingredient-category/ingredient-category';

import { WithLoader } from '@components/with-loader/with-loader';
import { useGetAvailableIngredientsQuery } from '@services/norma/api';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { IngredientTabType } from '@utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import {
	getSelectedIngredient,
	setSelectedIngredient,
} from '@services/selected-ingredient/slice';

interface IngredientListProps {
	bunsRef: RefObject<HTMLDivElement>;
	sauceRef: RefObject<HTMLDivElement>;
	mainRef: RefObject<HTMLDivElement>;
	tabsRef: RefObject<HTMLDivElement>;
	onTabSelect?: (tab: IngredientTabType) => void;
}

const tabsByOrder = [
	IngredientTabType.MAIN,
	IngredientTabType.SAUCE,
	IngredientTabType.BUN,
];

export const IngredientList = ({
	bunsRef,
	sauceRef,
	mainRef,
	tabsRef,
	onTabSelect,
}: IngredientListProps) => {
	const {
		isFetching: isLoadingIngredients,
		isError: hasErrorIngredients,
		data: ingredientsData,
	} = useGetAvailableIngredientsQuery();
	const dispatch = useDispatch();
	const selectedIngredientInfo = useSelector(getSelectedIngredient);
	const ingredientListRef = useRef<HTMLDivElement>(null);

	const closeIngredientDetails = () => {
		dispatch(setSelectedIngredient(null));
	};

	const bunsIngredients = useMemo(
		() =>
			ingredientsData?.filter((ingredient) => ingredient.type === 'bun') ?? [],
		[ingredientsData]
	);
	const sauceIngredients = useMemo(
		() =>
			ingredientsData?.filter((ingredient) => ingredient.type === 'sauce') ??
			[],
		[ingredientsData]
	);
	const mainIngredients = useMemo(
		() =>
			ingredientsData?.filter((ingredient) => ingredient.type === 'main') ?? [],
		[ingredientsData]
	);

	const handleScroll = () => {
		if (
			!bunsRef.current ||
			!mainRef.current ||
			!sauceRef.current ||
			!tabsRef.current
		) {
			return;
		}

		const categoriesRects = [
			mainRef.current.getBoundingClientRect(),
			sauceRef.current.getBoundingClientRect(),
			bunsRef.current.getBoundingClientRect(),
		];
		const tabsRect = tabsRef.current.getBoundingClientRect();
		const tabsY = tabsRect.top + tabsRect.height;
		for (const i in categoriesRects) {
			if (categoriesRects[i].top - categoriesRects[i].height < tabsY) {
				onTabSelect?.(tabsByOrder[i]);
				break;
			}
		}
	};

	return (
		<div
			onScroll={handleScroll}
			className={clsx('pt-10', styles.ingredientList)}>
			<WithLoader
				isLoading={isLoadingIngredients}
				hasError={hasErrorIngredients}>
				{ingredientsData && (
					<div ref={ingredientListRef} className={styles.ingredients}>
						<IngredientCategory
							name='Булки'
							nameRef={bunsRef}
							ingredients={bunsIngredients}
						/>
						<IngredientCategory
							name='Соусы'
							nameRef={sauceRef}
							ingredients={sauceIngredients}
						/>
						<IngredientCategory
							name='Начинки'
							nameRef={mainRef}
							ingredients={mainIngredients}
						/>
					</div>
				)}
			</WithLoader>
			{selectedIngredientInfo && (
				<Modal title='Детали ингредиента' onClose={closeIngredientDetails}>
					<IngredientDetails ingredientInfo={selectedIngredientInfo} />
				</Modal>
			)}
		</div>
	);
};
