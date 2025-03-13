import { PropsWithChildren, SyntheticEvent } from 'react';
import styles from './modal.module.scss';

interface ModalOverlayProps extends PropsWithChildren {
	onClick?: (e: SyntheticEvent) => void;
}

export const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
	return (
		<div className={styles.modalOverlay} aria-hidden={true} onClick={onClick}>
			{children}
		</div>
	);
};
