import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay';
import styles from './modal.module.scss';
import clsx from 'clsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps extends PropsWithChildren {
	title?: string;
	onClose?: () => void;
}

export const Modal = ({ children, title, onClose }: ModalProps) => {
	const modalRoot = document.getElementById('modals');

	const ModalComponent = () => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key !== 'Escape') {
				return;
			}
			onClose?.();
		};

		useEffect(() => {
			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}, []);

		return (
			<div className={clsx(styles.modalContainer)}>
				<div className={clsx('p-10', styles.modal)}>
					<div className={styles.header}>
						<p className='text text_type_main-large'>{title}</p>
						<span data-cy={'modal-cross'}>
							<CloseIcon
								onClick={onClose}
								className={styles.closeIcon}
								type='primary'
							/>
						</span>
					</div>
					<div>{children}</div>
				</div>
				<ModalOverlay onClick={onClose} />
			</div>
		);
	};

	return modalRoot && createPortal(<ModalComponent />, modalRoot);
};
