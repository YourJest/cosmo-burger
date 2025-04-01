import { SyntheticEvent } from 'react';
import styles from './modal.module.scss';

interface ModalOverlayProps {
	onClick?: (e: SyntheticEvent) => void;
}

export const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
	return (
		<div className={styles.modalOverlay} aria-hidden={true} onClick={onClick} />
	);
};
