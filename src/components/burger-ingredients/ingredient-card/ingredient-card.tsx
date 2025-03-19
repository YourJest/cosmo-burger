import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.scss';
import { useState } from 'react';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface IngredientCardProps {
	id: string;
	onClick?: () => void;
	count: number;
}

export const IngredientCard = ({ id, count }: IngredientCardProps) => {
	const [openIngredientDetails, setOpenIngredientDetails] = useState(false);
	const ingredientInfo = useSelector((store: RootState) =>
		store.burgerConstructorReducer.availableIngredients.find(
			(ingredient) => ingredient._id === id
		)
	);

	const toggleOpenIngredientsDetails = () => {
		setOpenIngredientDetails(!openIngredientDetails);
	};

	if (!ingredientInfo) {
		return null;
	}

	return (
		<button
			className={styles.ingredientCard}
			onClick={toggleOpenIngredientsDetails}>
			<img src={ingredientInfo.image} alt={ingredientInfo.name} />
			<div className={styles.price}>
				<p className='text text_type_digits-default'>{ingredientInfo.price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p className={clsx(styles.name, 'text text_type_main-default')}>
				{ingredientInfo.name}
			</p>
			{count > 0 && (
				<div className={styles.counter}>
					<Counter count={count} />
				</div>
			)}
			{openIngredientDetails && (
				<Modal
					title='Детали ингредиента'
					onClose={toggleOpenIngredientsDetails}>
					<IngredientDetails ingredientInfo={ingredientInfo} />
				</Modal>
			)}
		</button>
	);
};
