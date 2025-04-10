import { PropsWithChildren } from 'react';
import styles from './with-loader.module.scss';
import { RingLoader } from 'react-spinners';
import clsx from 'clsx';

interface WithLoaderProps extends PropsWithChildren {
	isLoading: boolean;
	hasError: boolean;
	loadingMessage?: string;
}

export const WithLoader = ({
	isLoading,
	hasError,
	loadingMessage,
	children,
}: WithLoaderProps) => {
	let result;
	if (isLoading) {
		result = (
			<div className={styles.withLoader}>
				<p className='text text_type_main-default'>{loadingMessage}</p>
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
