import { AppHeader } from '@components/app-header/app-header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '@pages/home/home';
import { LoginPage } from '@pages/login/login';
import { RegisterPage } from '@pages/register/register';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password';
import { Pages } from '@utils/constant';
import { RestorePasswordPage } from '@pages/restore-password/restore-password';
import {
	AuthorizedRoute,
	UnauthorizedRoute,
} from '@components/protected-route-element/protected-route-element';
import { ProfilePage } from '@pages/profile/profile';
import { ProfileEdit } from '@components/profile-edit/profile-edit';
import { ProfileOrders } from '@components/profile-orders/profile-orders';
import { useGetUserQuery } from '@services/norma/auth-api';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { useGetAvailableIngredientsQuery } from '@services/norma/api';
import { FeedPage } from '@pages/feed/feed';
import { OrderFeedDetails } from '@components/order-feed-details/order-feed-details';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

	useGetUserQuery();
	useGetAvailableIngredientsQuery();

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path={Pages.HOME} element={<HomePage />} />
				<Route
					path={Pages.PROFILE}
					element={<AuthorizedRoute element={<ProfilePage />} />}>
					<Route
						path={''}
						element={<AuthorizedRoute element={<ProfileEdit />} />}
					/>
					<Route path={Pages.PROFILE_ORDERS} element={<ProfileOrders />} />
				</Route>
				<Route path={Pages.ORDER_FEED} element={<FeedPage />} />
				<Route
					path={Pages.LOGIN}
					element={<UnauthorizedRoute element={<LoginPage />} />}
				/>
				<Route
					path={Pages.REGISTER}
					element={<UnauthorizedRoute element={<RegisterPage />} />}
				/>
				<Route
					path={Pages.FORGOT_PASSWORD}
					element={<UnauthorizedRoute element={<ForgotPasswordPage />} />}
				/>
				<Route
					path={Pages.RESTORE_PASSWORD}
					element={<UnauthorizedRoute element={<RestorePasswordPage />} />}
				/>
				<Route path={Pages.INGREDIENTS} element={<IngredientDetails />} />
				<Route path={Pages.ORDER_FEED_DETAILS} element={<OrderFeedDetails />} />
				<Route
					path={Pages.PROFILE_ORDERS_DETAILS}
					element={<OrderFeedDetails />}
				/>
			</Routes>
			{background && (
				<Routes>
					<Route
						path={Pages.INGREDIENTS}
						element={
							<Modal onClose={handleModalClose}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path={Pages.ORDER_FEED_DETAILS}
						element={
							<Modal onClose={handleModalClose}>
								<OrderFeedDetails />
							</Modal>
						}
					/>
					<Route
						path={Pages.PROFILE_ORDERS_DETAILS}
						element={
							<Modal onClose={handleModalClose}>
								<OrderFeedDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
