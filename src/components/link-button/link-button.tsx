import { ComponentProps, PropsWithChildren, ReactElement } from 'react';
import clsx from 'clsx';
import linkStyles from './link-button.module.scss';
import { Link, NavLink } from 'react-router-dom';

interface LinkButtonProps
	extends PropsWithChildren<ComponentProps<typeof Link>> {
	logo?: ((isActive: boolean) => ReactElement) | ReactElement;
}

export const LinkButton = ({
	logo,
	to = '/#',
	children,
	...props
}: LinkButtonProps) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				clsx(
					'text text_type_main-default',
					!isActive && 'text_color_inactive',
					'pb-4 pt-4 pl-5 pr-5',
					linkStyles.linkButton
				)
			}
			{...props}>
			{({ isActive }) => (
				<>
					{typeof logo === 'function' ? logo(isActive) : logo}
					{children}
				</>
			)}
		</NavLink>
	);
};
