import { createSelector } from '@reduxjs/toolkit';
import { normaApi } from './api';
import { RootState } from '../../store';

export const getAvailableIngredientsResult =
	normaApi.endpoints.getAvailableIngredients.select();

export const getAllIngredients = createSelector(
	getAvailableIngredientsResult,
	(getIngredientsResult) => getIngredientsResult?.data ?? []
);

export const getIngredientById = createSelector(
	getAllIngredients,
	(state: RootState, ingredientId: string) => ingredientId,
	(ingredients, ingredientId) =>
		ingredients.find((ingredient) => ingredient._id === ingredientId)
);
