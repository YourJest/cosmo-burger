import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { LinkButton } from '@components/link-button/link-button';

export const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.navigation}>
				<LinkButton active logo={<BurgerIcon type='primary' />} className=''>
					Конструктор
				</LinkButton>
				<LinkButton active={false} logo={<ListIcon type='secondary' />}>
					Лента заказов
				</LinkButton>
			</nav>
			<Logo />
			<nav>
				<LinkButton active={false} logo={<ProfileIcon type='secondary' />}>
					Личный кабинет
				</LinkButton>
			</nav>
		</header>
	);
};
