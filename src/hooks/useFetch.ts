import { useEffect, useState } from 'react';

export const useFetch = <Data>(url: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [data, setData] = useState<Data>();
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Fetch error ${response.status}`);
				}
				const { data } = await response.json();
				setData(data);
			} catch (error) {
				console.error(error);
				setHasError(true);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [url]);
	return { isLoading, hasError, data };
};
