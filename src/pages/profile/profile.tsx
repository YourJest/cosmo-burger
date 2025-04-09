import styles from './profile.module.scss';
import { Pages } from '@utils/constant';
import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useLogoutMutation } from '@services/norma/auth-api';

export const ProfilePage = () => {
	const location = useLocation();
	const [triggerLogout] = useLogoutMutation();

	const handleLogout = () => {
		triggerLogout();
	};

	return (
		<main className={styles.profilePage}>
			<div className={styles.navigation}>
				<nav className={styles.links}>
					<Link
						className={clsx(
							'text text_type_main-medium pt-4 pb-4',
							location.pathname !== Pages.PROFILE && 'text_color_inactive'
						)}
						to={Pages.PROFILE}>
						Профиль
					</Link>
					<Link
						to={Pages.ORDER_HISTORY}
						className={clsx(
							'text text_type_main-medium pt-4 pb-4',
							location.pathname !== Pages.ORDER_HISTORY && 'text_color_inactive'
						)}>
						История заказов
					</Link>
					<Link
						to={Pages.LOGIN}
						onClick={handleLogout}
						className={clsx(
							'text text_type_main-medium text_color_inactive pt-4 pb-4'
						)}>
						Выйти
					</Link>
				</nav>
				<p className='text text_type_main-small text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</div>
			<Outlet />
		</main>
	);
};
