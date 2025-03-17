import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { LinkButton } from '@components/link-button/link-button';
import clsx from 'clsx';

export const AppHeader = () => {
	return (
		<header className={clsx('p-2', styles.header)}>
			<nav className={styles.navigation}>
				<div className={styles.menuLeft}>
					<LinkButton active logo={<BurgerIcon type='primary' />}>
						Конструктор
					</LinkButton>
					<LinkButton active={false} logo={<ListIcon type='secondary' />}>
						Лента заказов
					</LinkButton>
				</div>
				<Logo />
				<LinkButton active={false} logo={<ProfileIcon type='secondary' />}>
					Личный кабинет
				</LinkButton>
			</nav>
		</header>
	);
};
