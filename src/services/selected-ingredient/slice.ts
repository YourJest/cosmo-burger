import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientEntry } from '@services/burger-constructor/slice';

interface SelectedIngredientSlice {
	selectedIngredient: null | IngredientEntry;
}

const initialState: SelectedIngredientSlice = {
	selectedIngredient: null,
};

export const selectedIngredientSlice = createSlice({
	name: 'selectedIngredient',
	initialState,
	reducers: {
		setSelectedIngredient: (
			state,
			action: PayloadAction<SelectedIngredientSlice['selectedIngredient']>
		) => {
			state.selectedIngredient = action.payload;
		},
	},
	selectors: {
		getSelectedIngredient: (state) => state.selectedIngredient,
	},
});

export const { setSelectedIngredient } = selectedIngredientSlice.actions;
export const { getSelectedIngredient } = selectedIngredientSlice.selectors;
