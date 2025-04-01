import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IngredientEntry } from './slice';

export const getOrder = createSelector(
	[
		(state: RootState) => state.burgerConstructor.bun,
		(state: RootState) => state.burgerConstructor.constructorIngredients,
	],
	(bun: IngredientEntry | null, ingredients: IngredientEntry[]) => {
		return [bun?._id ?? '0', ...ingredients.map((i) => i._id), bun?._id ?? '0'];
	}
);
export const getTotalPrice = createSelector(
	[
		(state: RootState) => state.burgerConstructor.bun,
		(state: RootState) => state.burgerConstructor.constructorIngredients,
	],
	(bun: IngredientEntry | null, ingredients: IngredientEntry[]) => {
		return (
			ingredients.reduce((prev, current) => prev + current.price, 0) +
			(bun?.price ?? 0) * 2
		);
	}
);
