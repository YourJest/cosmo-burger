import {
	addBunToConstructor,
	addIngredientToConstructor,
	BurgerConstructorSlice,
	IngredientEntry,
	initialState,
	reducer,
	removeIngredientFromConstructor,
	reorderConstructorIngredient,
} from '@services/burger-constructor/slice';

describe('burger constructor slice reducer', () => {
	const mockIngredient: IngredientEntry = {
		_id: 'id123',
		name: 'Test Ingredient',
		type: 'main',
		proteins: 1,
		fat: 2,
		carbohydrates: 3,
		calories: 100,
		price: 50,
		image: '',
		image_mobile: '',
		image_large: '',
		__v: 0,
	};

	const mockBun: IngredientEntry = {
		_id: 'bun-123',
		name: 'Test Bun',
		type: 'bun',
		proteins: 1,
		fat: 2,
		carbohydrates: 3,
		calories: 150,
		price: 40,
		image: '',
		image_mobile: '',
		image_large: '',
		__v: 0,
	};

	it('adds ingredient to constructor', () => {
		const mockConstructorId = 'mocked-id-1';

		const mockAction = {
			type: addIngredientToConstructor.type,
			payload: {
				...mockIngredient,
				constructorId: mockConstructorId,
			},
		};

		const result = reducer(initialState, mockAction);

		expect(result.constructorIngredients).toHaveLength(1);
		expect(result.constructorIngredients[0].constructorId).toBe(
			mockConstructorId
		);
		expect(result.constructorIngredients[0]._id).toBe(mockIngredient._id);
	});

	it('removes ingredient by constructorId', () => {
		const mockConstructorId = 'mocked-id-1';
		const prevState: BurgerConstructorSlice = {
			bun: null,
			constructorIngredients: [
				{ ...mockIngredient, constructorId: mockConstructorId },
			],
		};

		const mockAction = {
			type: removeIngredientFromConstructor.type,
			payload: mockConstructorId,
		};

		const result = reducer(prevState, mockAction);
		expect(result.constructorIngredients).toHaveLength(0);
	});

	it('reorders ingredients', () => {
		const prevState: BurgerConstructorSlice = {
			bun: null,
			constructorIngredients: [
				{ ...mockIngredient, _id: '1', constructorId: 'a' },
				{ ...mockIngredient, _id: '2', constructorId: 'b' },
				{ ...mockIngredient, _id: '3', constructorId: 'c' },
			],
		};

		const mockAction = {
			type: reorderConstructorIngredient.type,
			payload: { fromIndex: 2, toIndex: 0 },
		};

		const result = reducer(prevState, mockAction);
		const constructorIds = result.constructorIngredients.map(
			(i) => i.constructorId
		);
		expect(constructorIds).toEqual(['c', 'a', 'b']);
	});

	it('adds a bun to the constructor', () => {
		const mockAction = {
			type: addBunToConstructor.type,
			payload: mockBun,
		};

		const result = reducer(initialState, mockAction);
		expect(result.bun).toEqual(mockBun);
	});

	it('replaces existing bun with new one', () => {
		const oldBun = { ...mockBun, _id: 'old-bun' };
		const newBun = { ...mockBun, _id: 'new-bun' };

		const stateWithBun = { ...initialState, bun: oldBun };

		const action = {
			type: addBunToConstructor.type,
			payload: newBun,
		};

		const result = reducer(stateWithBun, action);
		expect(result.bun?._id).toBe('new-bun');
	});

	it('should clear ingredients and bun on placeOrder.fulfilled action', () => {
		const prevState: BurgerConstructorSlice = {
			constructorIngredients: [
				{ ...mockIngredient, constructorId: 'mocked-id-1' },
			],
			bun: mockBun,
		};

		const fulfilledAction = {
			type: 'normaApi/executeMutation/fulfilled',
			meta: {
				arg: {
					endpointName: 'placeOrder',
				},
			},
		};

		const newState = reducer(prevState, fulfilledAction);

		expect(newState.constructorIngredients).toEqual([]);
		expect(newState.bun).toBeNull();
	});
});
