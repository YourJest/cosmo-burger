/// <reference types="cypress" />

describe('template spec', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/ingredients', {
			fixture: 'ingredients',
		}).as('getIngredients');
		cy.intercept('GET', 'api/auth/user', {
			fixture: 'user',
		}).as('getUser');
		cy.intercept('POST', 'api/orders', {
			fixture: 'order',
		}).as('placeOrder');

		window.localStorage.setItem('refreshToken', 'test-refreshToken');
		window.localStorage.setItem('accessToken', 'test-accessToken');
	});

	// Dragging ingredients
	it('drags bun & ingredient to constructor', () => {
		cy.visit('');
		cy.get('[data-cy="ingredient-card-test-bun"]')
			.trigger('dragstart')
			.trigger('drag');
		cy.get('[data-cy="drop-top"]').trigger('dragover').trigger('drop');
		cy.getConstructorText('constructor-bun-top').should(
			'have.text',
			'Краторная булка N-200i'
		);
		cy.getConstructorText('constructor-bun-bottom').should(
			'have.text',
			'Краторная булка N-200i'
		);
		cy.get('[data-cy="ingredient-card-test-ingredient"]')
			.trigger('dragstart')
			.trigger('drag');
		cy.get('[data-cy="drop-main"]').trigger('dragover').trigger('drop');
		cy.getConstructorText('constructor-ingredient-test-ingredient').should(
			'have.text',
			'Биокотлета из марсианской Магнолии'
		);
	});

	// Create order
	it('successfully creates order', () => {
		cy.visit('');
		cy.wait('@getIngredients');
		cy.wait('@getUser').then(() => {
			cy.get('[data-cy="place-order"]').click();
			cy.get('[data-cy="order-number"]').should('have.text', '81220');
		});
	});

	// Modal
	it('successfully opens and closes ingredient modal', () => {
		cy.visit('');
		cy.wait('@getIngredients');
		cy.get('[data-cy="ingredient-card-test-bun"]').as('testBun');
		cy.get('@testBun').click();
		cy.get('[data-cy="details-name"]').as('detailsName');
		cy.get('@detailsName').should('have.text', 'Краторная булка N-200i');
		cy.get('[data-cy="modal-cross"]').click();
		cy.get('@detailsName').should('not.exist');
		cy.get('@testBun').click();
		cy.get('body').click(0, 0);
		cy.get('@detailsName').should('not.exist');
	});
});
