import { mockIngridients } from '@utils/data';
import { RefObject } from 'react';
import { IngridientCard } from '../ingridient-card/ingridient-card';
import clsx from 'clsx';
import styles from './ingridient-category.module.scss';

interface IngridientCategoryProps {
	nameRef: RefObject<HTMLDivElement>;
	name: string;
	ingridients: Array<(typeof mockIngridients)[0]>;
}

export const IngridientCategory = ({
	nameRef,
	name,
	ingridients,
}: IngridientCategoryProps) => {
	return (
		<>
			<p ref={nameRef} className='text text_type_main-medium'>
				{name}
			</p>
			<div className={clsx('pt-4', styles.ingridientCategory)}>
				{ingridients.map((ingridient) => (
					<IngridientCard
						key={ingridient._id}
						id={ingridient._id}
						count={0}
						imageSrc={ingridient.image}
						name={ingridient.name}
						price={ingridient.price}
					/>
				))}
			</div>
		</>
	);
};
