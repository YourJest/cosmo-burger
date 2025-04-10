import { Pages } from '@utils/constant';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '@services/user/slice';
import { useGetUserQuery, useLogoutMutation } from '@services/norma/auth-api';
import { WithLoader } from '@components/with-loader/with-loader';

interface ProtectedRouteElementProps {
	forAuthorized?: boolean;
	element: JSX.Element;
}

export const ProtectedRouteElement = ({
	forAuthorized = true,
	element,
}: ProtectedRouteElementProps) => {
	const location = useLocation();
	const user = useSelector(getUser);
	const { isFetching } = useGetUserQuery();
	const [, { isLoading: logoutInProcess }] = useLogoutMutation({
		fixedCacheKey: 'logout',
	});

	if (logoutInProcess || isFetching) {
		return <WithLoader isLoading hasError={false} />;
	}

	if (!user && forAuthorized) {
		const from = location;
		return <Navigate to={Pages.LOGIN} state={{ from }} />;
	}
	if (user && !forAuthorized) {
		const state = location.state?.from ?? { pathname: Pages.HOME };
		return <Navigate to={state.pathname} />;
	}
	return element;
};

export const AuthorizedRoute = ProtectedRouteElement;
export const UnauthorizedRoute = ({ element }: ProtectedRouteElementProps) => (
	<ProtectedRouteElement forAuthorized={false} element={element} />
);
