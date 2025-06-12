import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normaApi } from '@services/norma/api';

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

export interface ConstructorEntry extends IngredientEntry {
	constructorId: string;
}

export interface BurgerConstructorSlice {
	bun: IngredientEntry | null;
	constructorIngredients: ConstructorEntry[];
}

export const initialState: BurgerConstructorSlice = {
	bun: null,
	constructorIngredients: [],
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		addIngredientToConstructor: {
			reducer: (state, action: PayloadAction<ConstructorEntry>) => {
				state.constructorIngredients.push(action.payload);
			},
			prepare: (ingredient: IngredientEntry) => {
				return {
					payload: { constructorId: crypto.randomUUID(), ...ingredient },
				};
			},
		},
		addBunToConstructor: (state, action: PayloadAction<IngredientEntry>) => {
			state.bun = action.payload;
		},
		removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
			state.constructorIngredients = state.constructorIngredients.filter(
				(ingredient) => ingredient.constructorId !== action.payload
			);
		},
		reorderConstructorIngredient: (
			state,
			action: PayloadAction<{
				fromIndex: number;
				toIndex: number;
			}>
		) => {
			const { fromIndex, toIndex } = action.payload;
			const ingredients = [...state.constructorIngredients];
			ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
			state.constructorIngredients = ingredients;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			normaApi.endpoints.placeOrder.matchFulfilled,
			(state) => {
				state.constructorIngredients = [];
				state.bun = null;
			}
		);
	},
	selectors: {
		getBun: (state) => state.bun,
		getIngredients: (state) => state.constructorIngredients,
		getIngredientCount: (state, id: string, type: IngredientEntry['type']) =>
			type !== 'bun'
				? state.constructorIngredients.reduce(
						(prev, ingredient) => (ingredient._id === id ? prev + 1 : prev),
						0
				  )
				: state.bun?._id === id
				? 1
				: 0,
	},
});

export const reducer = burgerConstructorSlice.reducer;

export const {
	addIngredientToConstructor,
	addBunToConstructor,
	removeIngredientFromConstructor,
	reorderConstructorIngredient,
} = burgerConstructorSlice.actions;

export const { getBun, getIngredients, getIngredientCount } =
	burgerConstructorSlice.selectors;
