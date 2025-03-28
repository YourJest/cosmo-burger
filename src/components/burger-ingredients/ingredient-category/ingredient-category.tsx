import { RefObject } from 'react';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import clsx from 'clsx';
import styles from './ingredient-category.module.scss';
import { IngredientEntry } from '@services/burger-constructor/slice';

interface IngredientCategoryProps {
	nameRef: RefObject<HTMLDivElement>;
	name: string;
	ingredients: IngredientEntry[];
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
					<IngredientCard key={ingredient._id} ingredient={ingredient} />
				))}
			</div>
		</div>
	);
};
