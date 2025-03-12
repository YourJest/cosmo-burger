import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-filling.module.scss';
import { mockIngridients } from '@utils/data';

export const BurgerFilling = () => {
	const ingridients = mockIngridients.filter(
		(ingridient) => ingridient.type !== 'bun'
	);
	let bun = mockIngridients.find((ingridient) => ingridient.type === 'bun');
	if (!bun) {
		bun = {
			_id: '-1',
			name: 'Выберите булку',
			type: 'bun',
			proteins: 0,
			fat: 0,
			carbohydrates: 0,
			calories: 0,
			price: 0,
			image: '',
			image_mobile: '',
			image_large: '',
			__v: 0,
		};
	}
	return (
		<div className={styles.fillingWrapper}>
			<div className={'pl-8'}>
				<ConstructorElement
					price={bun.price}
					text={`${bun.name} (верх)`}
					thumbnail={bun.image}
					type='top'
					extraClass={styles.bun}
					isLocked
				/>
			</div>
			<div className={styles.ingridients}>
				{ingridients.map((ingridient) => (
					<div key={ingridient._id} className={styles.ingridient}>
						<DragIcon type='primary' />
						<ConstructorElement
							price={ingridient.price}
							text={ingridient.name}
							thumbnail={ingridient.image}
						/>
					</div>
				))}
			</div>
			<div className={'pl-8'}>
				<ConstructorElement
					price={bun.price}
					text={`${bun.name} (низ)`}
					thumbnail={bun.image}
					type='bottom'
					isLocked
				/>
			</div>
		</div>
	);
};
