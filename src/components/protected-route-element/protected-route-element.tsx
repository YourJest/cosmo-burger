import { Pages } from '@utils/constant';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { useGetUserQuery } from '@services/norma/auth-api';

interface ProtectedRouteElementProps {
	element: JSX.Element;
}

const onlyAuthorizedPath: string[] = [Pages.PROFILE, Pages.ORDER_HISTORY];

const onlyUnauthorizedPath: string[] = [
	Pages.LOGIN,
	Pages.REGISTER,
	Pages.FORGOT_PASSWORD,
	Pages.RESTORE_PASSWORD,
];

export const ProtectedRouteElement = ({
	element,
}: ProtectedRouteElementProps) => {
	const { pathname } = useLocation();
	const { isFetching } = useGetUserQuery();
	const user = useSelector((state: RootState) => state.user);
	if (isFetching) {
		return element;
	}
	if (pathname === Pages.HOME) {
		return element;
	}
	if (user.email && onlyAuthorizedPath.includes(pathname)) {
		return element;
	}
	if (!user.email && onlyAuthorizedPath.includes(pathname)) {
		return <Navigate to={Pages.LOGIN} replace />;
	}
	if (!user.email && onlyUnauthorizedPath.includes(pathname)) {
		return element;
	}
	if (user.email && onlyUnauthorizedPath.includes(pathname)) {
		return <Navigate to={Pages.HOME} replace />;
	}
	console.log('wtf?');
	return null;
};
