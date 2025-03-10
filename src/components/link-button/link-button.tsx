import { AnchorHTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import clsx from 'clsx';
import linkStyles from './link-button.module.scss';

interface LinkButtonProps
	extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
	logo?: ReactElement;
	active: boolean;
}

export const LinkButton = ({
	logo,
	href = '/#',
	active,
	children,
	className,
}: LinkButtonProps) => {
	return (
		<a
			href={href}
			className={clsx(
				'text text_type_main-default',
				!active && 'text_color_inactive',
				linkStyles.linkButton,
				className
			)}>
			{logo}
			{children}
		</a>
	);
};
