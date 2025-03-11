import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngridients } from '@components/burger-ingridients/burger-ingridients';
import styles from './app.module.scss';

export const App = () => {
	return (
		<>
			<AppHeader />
			<div className={styles.constructorPage}>
				<BurgerIngridients />
				<p>Здесь конструктор</p>
			</div>
		</>
	);
};
