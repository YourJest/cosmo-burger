import styles from './ingredient-details.module.scss';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { getIngredientById } from '@services/norma/selectors';
import { useAppSelector } from '@components/app/hooks';

export const IngredientDetails = () => {
	const { ingredientId } = useParams();
	const ingredientInfo = useAppSelector((state) =>
		getIngredientById(state, ingredientId ?? '')
	);

	if (!ingredientInfo) {
		return null;
	}

	return (
		<div className={styles.ingredientDetails}>
			<p className='text text_type_main-large'>Детали ингредиента</p>
			<img src={ingredientInfo.image_large} alt={ingredientInfo.name} />
			<div className={styles.nameAndDetails}>
				<p data-cy={'details-name'} className='text text_type_main-default'>
					{ingredientInfo.name}
				</p>
				<div
					className={clsx(
						'text text_type_main-small text_color_inactive',
						styles.details
					)}>
					<div className={styles.detailsEntry}>
						<p>Калории, ккал</p>
						<p>{ingredientInfo.calories}</p>
					</div>
					<div className={styles.detailsEntry}>
						<p>Белки, г</p>
						<p>{ingredientInfo.proteins}</p>
					</div>
					<div className={styles.detailsEntry}>
						<p>Жиры, г</p>
						<p>{ingredientInfo.fat}</p>
					</div>
					<div className={styles.detailsEntry}>
						<p>Углеводы, г</p>
						<p>{ingredientInfo.carbohydrates}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
