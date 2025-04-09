import { AppHeader } from '@components/app-header/app-header';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '@pages/home/home';
import { LoginPage } from '@pages/login/login';
import { RegisterPage } from '@pages/register/register';
import { ForgotPasswordPage } from '@pages/forgot-password/forgot-password';
import { Pages } from '@utils/constant';
import { RestorePasswordPage } from '@pages/restore-password/restore-password';
import { ProtectedRouteElement } from '@components/protected-route-element/protected-route-element';
import { ProfilePage } from '@pages/profile/profile';
import { ProfileEdit } from '@components/profile-edit/profile-edit';

export const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppHeader />
				<Routes>
					<Route
						path={Pages.HOME}
						element={<ProtectedRouteElement element={<HomePage />} />}
					/>
					<Route
						path={Pages.PROFILE}
						element={<ProtectedRouteElement element={<ProfilePage />} />}>
						<Route
							path={''}
							element={<ProtectedRouteElement element={<ProfileEdit />} />}
						/>
						<Route
							path={Pages.ORDER_HISTORY}
							element={<>Order history here</>}
						/>
					</Route>
					<Route
						path={Pages.LOGIN}
						element={<ProtectedRouteElement element={<LoginPage />} />}
					/>
					<Route
						path={Pages.REGISTER}
						element={<ProtectedRouteElement element={<RegisterPage />} />}
					/>
					<Route
						path={Pages.FORGOT_PASSWORD}
						element={<ProtectedRouteElement element={<ForgotPasswordPage />} />}
					/>
					<Route
						path={Pages.RESTORE_PASSWORD}
						element={
							<ProtectedRouteElement element={<RestorePasswordPage />} />
						}
					/>
				</Routes>
			</Provider>
		</BrowserRouter>
	);
};
