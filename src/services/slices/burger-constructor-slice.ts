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
	constructorIngredients: [
		{
			_id: '643d69a5c3f7b9001cfa093c',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		},
		{
			_id: '643d69a5c3f7b9001cfa0941',
			name: 'Говяжий метеорит (отбивная)',
			type: 'main',
			proteins: 800,
			fat: 800,
			carbohydrates: 300,
			calories: 2674,
			price: 3000,
			image: 'https://code.s3.yandex.net/react/code/meat-04.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
			__v: 0,
		},
	],
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
			state.constructorIngredients.push(ingredient);
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
