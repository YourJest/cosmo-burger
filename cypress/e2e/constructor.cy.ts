/// <reference types="cypress" />

describe('template spec', () => {
	beforeEach(() => {
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
			fixture: 'ingredients',
		}).as('getIngredients');
		cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
			fixture: 'user',
		}).as('getUser');
		cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
			fixture: 'order',
		}).as('placeOrder');
		window.localStorage.setItem('refreshToken', 'test-refreshToken');
		window.localStorage.setItem('accessToken', 'test-accessToken');
	});

	// Dragging ingredients
	it('drags bun to constructor', () => {
		cy.visit('http://localhost:8080');
		cy.get('[data-cy="ingredient-card-test-bun"]')
			.trigger('dragstart')
			.trigger('drag');
		cy.get('[data-cy="drop-top"]').trigger('dragover').trigger('drop');
		cy.get('[data-cy="constructor-bun-top"]')
			.find('.constructor-element__text')
			.should('have.text', 'Краторная булка N-200i');
		cy.get('[data-cy="constructor-bun-bottom"]')
			.find('.constructor-element__text')
			.should('have.text', 'Краторная булка N-200i');
	});
	it('drags ingredient to constructor', () => {
		cy.visit('http://localhost:8080');
		cy.get('[data-cy="ingredient-card-test-ingredient"]')
			.trigger('dragstart')
			.trigger('drag');
		cy.get('[data-cy="drop-main"]').trigger('dragover').trigger('drop');
		cy.get('[data-cy="constructor-ingredient-test-ingredient"]')
			.find('.constructor-element__text')
			.should('have.text', 'Биокотлета из марсианской Магнолии');
	});

	// Create order
	it('successfully creates order', () => {
		cy.visit('http://localhost:8080');
		cy.wait('@getIngredients');
		cy.wait('@getUser').then(() => {
			cy.get('[data-cy="place-order"]').click();
			cy.get('[data-cy="order-number"]').should('have.text', '81220');
		});
	});

	// Modal
	it('successfully open ingredient modal', () => {
		cy.visit('http://localhost:8080');
		cy.wait('@getIngredients');
		cy.get('[data-cy="ingredient-card-test-bun"]').click();
		cy.get('[data-cy="details-name"]').should(
			'have.text',
			'Краторная булка N-200i'
		);
	});
	it('successfully close ingredient modal by click on cross', () => {
		cy.visit('http://localhost:8080');
		cy.wait('@getIngredients');
		cy.get('[data-cy="ingredient-card-test-bun"]').click();
		cy.get('[data-cy="modal-cross"]').click();
		cy.get('[data-cy="details-name"]').should('not.exist');
	});
	it('successfully close ingredient modal by click outside', () => {
		cy.visit('http://localhost:8080');
		cy.wait('@getIngredients');
		cy.get('[data-cy="ingredient-card-test-bun"]').click();
		cy.get('body').click(0, 0);
		cy.get('[data-cy="details-name"]').should('not.exist');
	});
});
