import { RefObject } from 'react';
import { IngredientCard } from '../ingredient-card/ingredient-card';
import clsx from 'clsx';
import styles from './ingredient-category.module.scss';
import { IngredientEntry } from '@services/slices/burger-constructor-slice';

interface IngredientCategoryProps {
	nameRef: RefObject<HTMLDivElement>;
	name: string;
	ingredients: IngredientEntry[];
	onOpenDetails?: (id: string) => void;
}

export const IngredientCategory = ({
	nameRef,
	name,
	ingredients,
	onOpenDetails,
}: IngredientCategoryProps) => {
	return (
		<div>
			<p ref={nameRef} className='text text_type_main-medium'>
				{name}
			</p>
			<div className={clsx('pt-4', styles.ingredientCategory)}>
				{ingredients.map((ingredient) => (
					<IngredientCard
						key={ingredient._id}
						id={ingredient._id}
						count={1}
						onClick={onOpenDetails}
					/>
				))}
			</div>
		</div>
	);
};
