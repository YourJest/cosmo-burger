declare namespace Cypress {
	interface Chainable {
		getConstructorText(alias: string): Chainable<JQuery<HTMLElement>>;
	}
}
