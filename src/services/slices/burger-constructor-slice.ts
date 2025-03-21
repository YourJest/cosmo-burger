import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normaApi } from '@services/api/norma-api';

export interface IngredientEntry {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface BurgerConstructorSlice {
	availableIngredients: IngredientEntry[];
	constructorIngredients: IngredientEntry[];
}

const initialState: BurgerConstructorSlice = {
	availableIngredients: [],
	constructorIngredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredientToConstructor: (state, action: PayloadAction<string>) => {
			const ingredient = state.availableIngredients.find(
				(ingredient) => ingredient._id === action.payload
			);
			if (!ingredient) {
				return;
			}
			state.constructorIngredients = [
				...state.constructorIngredients,
				ingredient,
			];
		},
		removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
			state.constructorIngredients = [
				...state.constructorIngredients.filter(
					(ingredient) => ingredient._id !== action.payload
				),
			];
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			normaApi.endpoints.getAvailableIngredients.matchFulfilled,
			(state, { payload }) => {
				state.availableIngredients = payload;
			}
		);
	},
});

export const { addIngredientToConstructor, removeIngredientFromConstructor } =
	burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
