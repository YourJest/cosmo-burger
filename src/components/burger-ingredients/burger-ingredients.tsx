import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import styles from './burger-ingredients.module.scss';
import { IngredientList } from './ingredient-list/ingredient-list';
import clsx from 'clsx';
import { IngredientTabType } from '@utils/constant';

export const BurgerIngredients = () => {
	const [selectedTab, setSelectedTab] = useState<IngredientTabType>(
		IngredientTabType.BUN
	);
	const tabsRef = useRef<HTMLDivElement>(null);
	const bunsRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const handleTabSelect = (tabType: IngredientTabType) => {
		switch (tabType) {
			case IngredientTabType.BUN:
				bunsRef.current?.scrollIntoView();
				break;
			case IngredientTabType.SAUCE:
				sauceRef.current?.scrollIntoView();
				break;
			case IngredientTabType.MAIN:
				mainRef.current?.scrollIntoView();
				break;
		}
		setSelectedTab(tabType);
	};

	return (
		<section className={clsx('pt-10', styles.burgerIngredients)}>
			<h1 className='text text_type_main-large'>Соберите бургер</h1>
			<div className={clsx('pr-4', styles.tabs)} ref={tabsRef}>
				<Tab
					value={IngredientTabType.BUN}
					active={selectedTab === IngredientTabType.BUN}
					onClick={(value) => handleTabSelect(value as IngredientTabType)}>
					Булки
				</Tab>
				<Tab
					value={IngredientTabType.SAUCE}
					active={selectedTab === IngredientTabType.SAUCE}
					onClick={(value) => handleTabSelect(value as IngredientTabType)}>
					Соусы
				</Tab>
				<Tab
					value={IngredientTabType.MAIN}
					active={selectedTab === IngredientTabType.MAIN}
					onClick={(value) => handleTabSelect(value as IngredientTabType)}>
					Начинки
				</Tab>
			</div>
			<IngredientList
				bunsRef={bunsRef}
				sauceRef={sauceRef}
				mainRef={mainRef}
				tabsRef={tabsRef}
				onTabSelect={setSelectedTab}
			/>
		</section>
	);
};
