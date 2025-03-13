import { createContext, PropsWithChildren, useContext } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { ingredientsApiUrl, IngridientEntry } from '@utils/api-urls';

interface AppContext {
	isLoadingIngridients: boolean;
	hasErrorIngrindents: boolean;
	ingridientsData: IngridientEntry[] | undefined;
	getInridientById: (id: string) => IngridientEntry | undefined;
}
const AppContext = createContext<AppContext | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const {
		isLoading: isLoadingIngridients,
		hasError: hasErrorIngrindents,
		data: ingridientsData,
	} = useFetch<IngridientEntry[]>(ingredientsApiUrl);

	const getInridientById = (id: string): IngridientEntry | undefined => {
		return ingridientsData?.find((ingridient) => ingridient._id === id);
	};

	return (
		<AppContext.Provider
			value={{
				isLoadingIngridients,
				hasErrorIngrindents,
				ingridientsData,
				getInridientById,
			}}>
			{children}
		</AppContext.Provider>
	);
};
export function useAppContext() {
	const context = useContext(AppContext);
	if (!context) throw new Error('Use app context within provider!');
	return context;
}
