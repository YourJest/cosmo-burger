import styles from './ingridient-list.module.scss';
import { RefObject } from 'react';
import clsx from 'clsx';
import { IngridientCategory } from '../ingridient-category/ingridient-category';

import { WithLoader } from '@components/with-loader/with-loader';
import { useAppContext } from '@components/context/app-context';

interface IngridientListProps {
	bunsRef: RefObject<HTMLDivElement>;
	sauceRef: RefObject<HTMLDivElement>;
	mainRef: RefObject<HTMLDivElement>;
}

export const IngridientList = ({
	bunsRef,
	sauceRef,
	mainRef,
}: IngridientListProps) => {
	const { isLoadingIngridients, hasErrorIngrindents, ingridientsData } =
		useAppContext();
	return (
		<div className={clsx('pt-10', styles.ingridientList)}>
			<WithLoader
				isLoading={isLoadingIngridients}
				hasError={hasErrorIngrindents}>
				{ingridientsData && (
					<>
						<IngridientCategory
							name='Булки'
							nameRef={bunsRef}
							ingridients={ingridientsData.filter(
								(ingridient) => ingridient.type === 'bun'
							)}
						/>
						<IngridientCategory
							name='Соусы'
							nameRef={sauceRef}
							ingridients={ingridientsData.filter(
								(ingridient) => ingridient.type === 'sauce'
							)}
						/>
						<IngridientCategory
							name='Начинки'
							nameRef={mainRef}
							ingridients={ingridientsData.filter(
								(ingridient) => ingridient.type === 'main'
							)}
						/>
					</>
				)}
			</WithLoader>
		</div>
	);
};
