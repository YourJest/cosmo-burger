import { mockIngredients } from '@utils/data';
import { RefObject } from 'react';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import clsx from 'clsx';
import styles from './ingredient-category.module.scss';

interface IngredientCategoryProps {
	nameRef: RefObject<HTMLDivElement>;
	name: string;
	ingredients: Array<(typeof mockIngredients)[0]>;
}

export const IngredientCategory = ({
	nameRef,
	name,
	ingredients,
}: IngredientCategoryProps) => {
	return (
		<div>
			<p ref={nameRef} className='text text_type_main-medium'>
				{name}
			</p>
			<div className={clsx('pt-4', styles.ingredientCategory)}>
				{ingredients.map((ingredient) => (
					<IngredientCard key={ingredient._id} id={ingredient._id} count={1} />
				))}
			</div>
		</div>
	);
};
