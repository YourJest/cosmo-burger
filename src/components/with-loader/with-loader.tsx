import { PropsWithChildren } from 'react';
import styles from './with-loader.module.scss';
import { RingLoader } from 'react-spinners';
import clsx from 'clsx';

interface WithLoaderProps extends PropsWithChildren {
	isLoading: boolean;
	hasError: boolean;
}

// TODO Лоадер покрасивее
export const WithLoader = ({
	isLoading,
	hasError,
	children,
}: WithLoaderProps) => {
	let result;
	if (isLoading) {
		result = (
			<div className={styles.withLoader}>
				<RingLoader color='var(--colors-interface-accent)' />
			</div>
		);
	} else if (!isLoading && hasError) {
		result = (
			<div className={styles.withLoader}>
				<p className={clsx('text text_type_main-default', styles.error)}>
					Ошибка!
				</p>
			</div>
		);
	} else {
		result = children;
	}
	return result;
};
