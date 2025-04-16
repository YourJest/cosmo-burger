import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { LinkButton } from '@components/link-button/link-button';
import clsx from 'clsx';
import { Pages } from '@utils/constant';
import { getName } from '@services/user/slice';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@components/app/hooks';

export const AppHeader = () => {
	const name = useAppSelector(getName);
	return (
		<header className={clsx('p-2', styles.header)}>
			<nav className={styles.navigation}>
				<div className={styles.menuLeft}>
					<LinkButton
						to={Pages.HOME}
						logo={(isActive) => (
							<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
						)}>
						Конструктор
					</LinkButton>
					<LinkButton
						to={Pages.ORDER_FEED}
						logo={(isActive) => (
							<ListIcon type={isActive ? 'primary' : 'secondary'} />
						)}>
						Лента заказов
					</LinkButton>
				</div>
				<Link to={Pages.HOME}>
					<Logo />
				</Link>
				<LinkButton
					to={Pages.PROFILE}
					logo={(isActive) => (
						<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
					)}>
					{name ?? 'Личный кабинет'}
				</LinkButton>
			</nav>
		</header>
	);
};
