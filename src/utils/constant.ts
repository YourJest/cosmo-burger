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
	ORDER_FEED = '/order-feed',
	PROFILE = '/profile',
	PROFILE_ORDERS = '/profile/orders',
	INGREDIENTS = '/ingredients/:ingredientId',
}
