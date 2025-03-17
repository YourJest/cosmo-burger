import { IngridientEntry } from '@utils/api-urls';
import styles from './ingridient-details.module.scss';
import clsx from 'clsx';

interface IngridientDetailsProps {
	ingridientInfo: IngridientEntry;
}

export const IngridientDetails = ({
	ingridientInfo,
}: IngridientDetailsProps) => {
	return (
		<div className={styles.ingridientDetails}>
			<img src={ingridientInfo.image_large} alt={ingridientInfo.name} />
			<div className={styles.nameAndDetails}>
				<p className='text text_type_main-default'>{ingridientInfo.name}</p>
				<div
					className={clsx(
						'text text_type_main-small text_color_inactive',
						styles.details
					)}>
					<div className={styles.detailsEntry}>
						<p>Калории, ккал</p>
						<p>{ingridientInfo.calories}</p>
					</div>
					<div className={styles.detailsEntry}>
						<p>Белки, г</p>
						<p>{ingridientInfo.proteins}</p>
					</div>
					<div className={styles.detailsEntry}>
						<p>Жиры, г</p>
						<p>{ingridientInfo.fat}</p>
					</div>
					<div className={styles.detailsEntry}>
						<p>Углеводы, г</p>
						<p>{ingridientInfo.carbohydrates}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
