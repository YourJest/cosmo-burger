import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import styles from './app.module.scss';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import clsx from 'clsx';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	return (
		<Provider store={store}>
			<AppHeader />
			<main className={clsx('pb-10', styles.constructorPage)}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</Provider>
	);
};
