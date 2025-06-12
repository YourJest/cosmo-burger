import { initialState, reducer, UserState } from '@services/user/slice';

describe('userSlice reducer (extraReducers)', () => {
	const mockUser = {
		email: 'test@example.com',
		name: 'Test User',
	};

	it('handles login.fulfilled', () => {
		const action = {
			type: 'normaApi/executeMutation/fulfilled',
			payload: { user: mockUser },
			meta: {
				arg: { endpointName: 'login' },
			},
		};

		const result = reducer(initialState, action);
		expect(result.user).toEqual(mockUser);
	});

	it('handles register.fulfilled', () => {
		const action = {
			type: 'normaApi/executeMutation/fulfilled',
			payload: { user: mockUser },
			meta: {
				arg: { endpointName: 'register' },
			},
		};

		const result = reducer(initialState, action);
		expect(result.user).toEqual(mockUser);
	});

	it('handles getUser.fulfilled', () => {
		const action = {
			type: 'normaApi/executeQuery/fulfilled',
			payload: { user: mockUser },
			meta: {
				arg: { endpointName: 'getUser' },
			},
		};

		const result = reducer(initialState, action);
		expect(result.user).toEqual(mockUser);
	});

	it('handles updateUser.fulfilled', () => {
		const action = {
			type: 'normaApi/executeMutation/fulfilled',
			payload: { user: mockUser },
			meta: {
				arg: { endpointName: 'updateUser' },
			},
		};

		const result = reducer(initialState, action);
		expect(result.user).toEqual(mockUser);
	});

	it('handles logout', () => {
		const stateWithUser: UserState = {
			user: mockUser,
		};

		const action = {
			type: 'normaApi/executeMutation/pending',
			meta: {
				arg: { endpointName: 'logout' },
			},
		};

		const result = reducer(stateWithUser, action);
		expect(result.user).toBeNull();
	});
});
