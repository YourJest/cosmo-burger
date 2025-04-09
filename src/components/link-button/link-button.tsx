import { ComponentProps, PropsWithChildren, ReactElement } from 'react';
import clsx from 'clsx';
import linkStyles from './link-button.module.scss';
import { Link } from 'react-router-dom';

interface LinkButtonProps
	extends PropsWithChildren<ComponentProps<typeof Link>> {
	logo?: ReactElement;
	active: boolean;
}

export const LinkButton = ({
	logo,
	to = '/#',
	active,
	children,
	...props
}: LinkButtonProps) => {
	return (
		<Link
			to={to}
			className={clsx(
				'text text_type_main-default',
				!active && 'text_color_inactive',
				'pb-4 pt-4 pl-5 pr-5',
				linkStyles.linkButton
			)}
			{...props}>
			{logo}
			{children}
		</Link>
	);
};
