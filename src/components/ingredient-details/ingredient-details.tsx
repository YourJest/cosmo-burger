import { IngredientEntry } from '@services/slices/burger-constructor-slice';
import styles from './ingredient-details.module.scss';
import clsx from 'clsx';

interface IngredientDetailsProps {
	ingredientInfo: IngredientEntry;
}

export const IngredientDetails = ({
	ingredientInfo,
}: IngredientDetailsProps) => {
	return (
		<div className={styles.ingredientDetails}>
			<img src={ingredientInfo.image_large} alt={ingredientInfo.name} />
			<div className={styles.nameAndDetails}>
				<p className='text text_type_main-default'>{ingredientInfo.name}</p>
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
