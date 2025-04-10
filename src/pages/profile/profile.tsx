import styles from './profile.module.scss';
import { Pages } from '@utils/constant';
import { Outlet, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useLogoutMutation } from '@services/norma/auth-api';

export const ProfilePage = () => {
	const [triggerLogout] = useLogoutMutation({ fixedCacheKey: 'logout' });

	const handleLogout = () => {
		triggerLogout();
	};

	return (
		<main className={styles.profilePage}>
			<div className={styles.wrapper}>
				<div className={styles.navigation}>
					<nav className={styles.links}>
						<NavLink
							end
							className={({ isActive }) =>
								clsx(
									'text text_type_main-medium pt-4 pb-4',
									!isActive && 'text_color_inactive'
								)
							}
							to={Pages.PROFILE}>
							Профиль
						</NavLink>
						<NavLink
							end
							to={Pages.PROFILE_ORDERS}
							className={({ isActive }) =>
								clsx(
									'text text_type_main-medium pt-4 pb-4',
									!isActive && 'text_color_inactive'
								)
							}>
							История заказов
						</NavLink>
						<NavLink
							to={Pages.HOME}
							onClick={handleLogout}
							className={clsx(
								'text text_type_main-medium text_color_inactive pt-4 pb-4 '
							)}>
							Выйти
						</NavLink>
					</nav>
					<p className='text text_type_main-small text_color_inactive'>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
				<Outlet />
			</div>
		</main>
	);
};
