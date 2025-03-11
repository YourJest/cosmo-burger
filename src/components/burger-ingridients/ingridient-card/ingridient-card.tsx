import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './igridient-card.module.scss';

interface IngridientCardProps {
	id: string;
	name: string;
	price: number;
	imageSrc: string;
	onClick?: () => void;
	count: number;
}

export const IngridientCard = ({
	name,
	price,
	imageSrc,
	count,
}: IngridientCardProps) => {
	return (
		<div className={styles.ingridientCard}>
			<img src={imageSrc} alt={name} />
			<div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
				<p className='text text_type_digits-default'>{price}</p>
				<CurrencyIcon type='primary' />
			</div>
			<p
				className='text text_type_main-default'
				style={{ textAlign: 'center' }}>
				{name}
			</p>
			{count > 0 && (
				<div className={styles.counter}>
					<Counter count={count} />
				</div>
			)}
		</div>
	);
};
