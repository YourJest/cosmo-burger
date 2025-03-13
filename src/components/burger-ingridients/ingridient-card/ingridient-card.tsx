import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './igridient-card.module.scss';
import { useState } from 'react';
import { Modal } from '@components/modal/modal';
import { useAppContext } from '@components/context/app-context';
import { IngridientDetails } from '@components/ingridient-details/ingridient-details';

interface IngridientCardProps {
	id: string;
	onClick?: () => void;
	count: number;
}

export const IngridientCard = ({ id, count }: IngridientCardProps) => {
	const [openIngridentDetails, setOpenIngridientDetails] = useState(false);
	const { getInridientById } = useAppContext();
	const ingridentInfo = getInridientById(id);

	const toggleOpenIngridientsDetails = () => {
		setOpenIngridientDetails(!openIngridentDetails);
	};

	if (!ingridentInfo) {
		return null;
	}

	return (
		<button
			className={styles.ingridientCard}
			onClick={toggleOpenIngridientsDetails}>
			<img src={ingridentInfo.image} alt={ingridentInfo.name} />
			<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
				<p className='text text_type_digits-default'>{ingridentInfo.price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p
				className='text text_type_main-default'
				style={{ textAlign: 'center' }}>
				{ingridentInfo.name}
			</p>
			{count > 0 && (
				<div className={styles.counter}>
					<Counter count={count} />
				</div>
			)}
			<Modal
				title='Детали ингредиента'
				open={openIngridentDetails}
				onClose={toggleOpenIngridientsDetails}>
				<IngridientDetails ingridientInfo={ingridentInfo} />
			</Modal>
		</button>
	);
};
