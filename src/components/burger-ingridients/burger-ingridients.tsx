import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import styles from './burger-ingridients.module.scss';
import { IngridientList } from './ingridient-list/ingridient-list';

enum IngridientTabType {
	BUN = 'bun',
	MAIN = 'main',
	SAUCE = 'sauce',
}
export const BurgerIngridients = () => {
	const [selectedTab, setSelectedTab] = useState<IngridientTabType>(
		IngridientTabType.BUN
	);
	const bunsRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const handleTabSelect = (tabType: IngridientTabType) => {
		switch (tabType) {
			case IngridientTabType.BUN:
				bunsRef.current?.scrollIntoView();
				break;
			case IngridientTabType.SAUCE:
				sauceRef.current?.scrollIntoView();
				break;
			case IngridientTabType.MAIN:
				mainRef.current?.scrollIntoView();
				break;
		}
		setSelectedTab(tabType);
	};

	return (
		<section className={styles.burgerIngridients}>
			<h1 className='text text_type_main-large'>Соберите бургер</h1>
			<div style={{ display: 'flex' }}>
				<Tab
					value={IngridientTabType.BUN}
					active={selectedTab === IngridientTabType.BUN}
					onClick={(value) => handleTabSelect(value as IngridientTabType)}>
					Булки
				</Tab>
				<Tab
					value={IngridientTabType.SAUCE}
					active={selectedTab === IngridientTabType.SAUCE}
					onClick={(value) => handleTabSelect(value as IngridientTabType)}>
					Соусы
				</Tab>
				<Tab
					value={IngridientTabType.MAIN}
					active={selectedTab === IngridientTabType.MAIN}
					onClick={(value) => handleTabSelect(value as IngridientTabType)}>
					Начинки
				</Tab>
			</div>
			<IngridientList bunsRef={bunsRef} sauceRef={sauceRef} mainRef={mainRef} />
		</section>
	);
};
