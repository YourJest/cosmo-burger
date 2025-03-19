import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-filling.module.scss';
import { WithLoader } from '@components/with-loader/with-loader';
import { useGetAvailableIngredientsQuery } from '@services/api/norma-api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const BurgerFilling = () => {
	const { isFetching: isLoadingIngredients, isError: hasErrorIngredients } =
		useGetAvailableIngredientsQuery();

	const { constructorIngredients } = useSelector(
		(store: RootState) => store.burgerConstructorReducer
	);

	const ingredients = constructorIngredients.filter(
		(ingridient) => ingridient.type !== 'bun'
	);

	let bun = constructorIngredients?.find(
		(ingredient) => ingredient.type === 'bun'
	);
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
			<WithLoader
				isLoading={isLoadingIngredients}
				hasError={hasErrorIngredients}>
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
				<div className={styles.ingredients}>
					{ingredients?.map((ingredient) => (
						<div key={ingredient._id} className={styles.ingredient}>
							<DragIcon type='primary' />
							<ConstructorElement
								price={ingredient.price}
								text={ingredient.name}
								thumbnail={ingredient.image}
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
			</WithLoader>
		</div>
	);
};
