import { mockIngridients } from '@utils/data';
import { IngridientCard } from '../ingridient-card/ingridient-card';
import styles from './ingridient-list.module.scss';
import { RefObject } from 'react';

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
		<div className={styles.ingridientList}>
			<p ref={bunsRef} className='text text_type_main-default'>
				Булки
			</p>
			<div className={styles.ingridientCategory}>
				{mockIngridients
					.filter((ingridient) => ingridient.type === 'bun')
					.map((bun) => (
						<IngridientCard
							key={bun._id}
							id={bun._id}
							count={0}
							imageSrc={bun.image}
							name={bun.name}
							price={bun.price}
						/>
					))}
			</div>
			<p ref={sauceRef} className='text text_type_main-default'>
				Соусы
			</p>
			<div className={styles.ingridientCategory}>
				{mockIngridients
					.filter((ingridient) => ingridient.type === 'sauce')
					.map((sauce) => (
						<IngridientCard
							id={sauce._id}
							key={sauce._id}
							count={0}
							imageSrc={sauce.image}
							name={sauce.name}
							price={sauce.price}
						/>
					))}
			</div>
			<p ref={mainRef} className='text text_type_main-default'>
				Начинки
			</p>
			<div className={styles.ingridientCategory}>
				{mockIngridients
					.filter((ingridient) => ingridient.type === 'main')
					.map((main) => (
						<IngridientCard
							id={main._id}
							key={main._id}
							count={0}
							imageSrc={main.image}
							name={main.name}
							price={main.price}
						/>
					))}
			</div>
		</div>
	);
};
