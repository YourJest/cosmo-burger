import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import { LinkButton } from '@components/link-button/link-button';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Pages } from '@utils/constant';
import { useSelector } from 'react-redux';
import { getName } from '@services/user/slice';

export const AppHeader = () => {
	const { pathname } = useLocation();
	const name = useSelector(getName);
	return (
		<header className={clsx('p-2', styles.header)}>
			<nav className={styles.navigation}>
				<div className={styles.menuLeft}>
					<LinkButton
						to={Pages.HOME}
						active={pathname === Pages.HOME}
						logo={
							<BurgerIcon
								type={pathname === Pages.HOME ? 'primary' : 'secondary'}
							/>
						}>
						Конструктор
					</LinkButton>
					<LinkButton
						to={Pages.ORDER_FEED}
						active={false}
						logo={<ListIcon type='secondary' />}>
						Лента заказов
					</LinkButton>
				</div>
				<Logo />
				<LinkButton
					to={Pages.PROFILE}
					active={pathname.includes(Pages.PROFILE)}
					logo={
						<ProfileIcon
							type={pathname.includes(Pages.PROFILE) ? 'primary' : 'secondary'}
						/>
					}>
					{name ?? 'Личный кабинет'}
				</LinkButton>
			</nav>
		</header>
	);
};
