export enum DraggableIngredientType {
	IngredientCard = 'ingredient-card',
	IngredientCardBun = 'ingredient-card-bun',
	ConstructorIngredient = 'constructor-ingredient',
}
export enum IngredientTabType {
	BUN = 'bun',
	MAIN = 'main',
	SAUCE = 'sauce',
}

export enum Pages {
	HOME = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	FORGOT_PASSWORD = '/forgot-password',
	RESTORE_PASSWORD = '/restore-password',
	ORDER_FEED = '/feed',
	ORDER_FEED_DETAILS = '/feed/:number',
	PROFILE = '/profile',
	PROFILE_ORDERS = '/profile/orders',
	PROFILE_ORDERS_DETAILS = '/profile/orders/:number',
	INGREDIENTS = '/ingredients/:ingredientId',
}

export const statusReadable = {
	done: 'Готов',
	created: 'Создан',
	pending: 'В работе',
};
