import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngridients } from '@components/burger-ingridients/burger-ingridients';
import styles from './app.module.scss';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import clsx from 'clsx';
import { AppContextProvider } from '@components/context/app-context';

export const App = () => {
	return (
		<>
			<AppContextProvider>
				<AppHeader />
				<main className={clsx('pb-10', styles.constructorPage)}>
					<BurgerIngridients />
					<BurgerConstructor />
				</main>
			</AppContextProvider>
		</>
	);
};
