import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.scss';
import clsx from 'clsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps extends PropsWithChildren {
	title?: string;
	open: boolean;
	onClose?: () => void;
}

export const Modal = ({ children, title, open, onClose }: ModalProps) => {
	const modalRoot = document.getElementById('modals');

	const ModalComponent = () => {
		useEffect(() => {
			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}, []);

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') {
				return;
			}
			onClose?.();
		};

		return (
			<ModalOverlay onClick={onClose}>
				<div
					className={clsx('p-10', styles.modal)}
					aria-hidden
					onClick={(e) => e.stopPropagation()}>
					<div className={styles.header}>
						<p className='text text_type_main-large'>{title}</p>
						<CloseIcon
							onClick={onClose}
							className={styles.closeIcon}
							type='primary'
						/>
					</div>
					{children}
				</div>
			</ModalOverlay>
		);
	};

	return modalRoot && open && createPortal(<ModalComponent />, modalRoot);
};
