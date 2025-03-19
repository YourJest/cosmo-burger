import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import clsx from 'clsx';
import { Provider } from 'react-redux';
import { store } from '../../store';

export const App = () => {
	return (
		<Provider store={store}>
			<AppHeader />
			<main className={clsx('pb-10', styles.constructorPage)}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</Provider>
	);
};
