import { mockIngridients } from '@utils/data';
import styles from './ingridient-list.module.scss';
import { RefObject } from 'react';
import clsx from 'clsx';
import { IngridientCategory } from '../ingridient-category/ingridient-category';

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
	return (
		<div className={clsx('pt-10', styles.ingridientList)}>
			<IngridientCategory
				name='Булки'
				nameRef={bunsRef}
				ingridients={mockIngridients.filter(
					(ingridient) => ingridient.type === 'bun'
				)}
			/>
			<IngridientCategory
				name='Соусы'
				nameRef={sauceRef}
				ingridients={mockIngridients.filter(
					(ingridient) => ingridient.type === 'sauce'
				)}
			/>
			<IngridientCategory
				name='Начинки'
				nameRef={mainRef}
				ingridients={mockIngridients.filter(
					(ingridient) => ingridient.type === 'main'
				)}
			/>
		</div>
	);
};
