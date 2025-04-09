import { ChangeEvent, useState } from 'react';

export const useForm = <FormFields>(initialState: FormFields) => {
	const [fields, setFields] = useState(initialState);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};
	return { fields, handleChange };
};
