import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.edit.module.scss';
import { FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProfileEditForm {
	name: string;
	email: string;
	password: string;
}

export const ProfileEdit = () => {
	const user = useSelector((state: RootState) => state.user);
	const { fields, handleChange } = useForm<ProfileEditForm>({
		name: user.name ?? '',
		email: user.email ?? '',
		password: '',
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<form className={styles.profileEdit} onSubmit={handleSubmit}>
			<Input
				name='name'
				type='text'
				placeholder='Имя'
				icon={'EditIcon'}
				value={fields.name}
				onChange={handleChange}
			/>
			<Input
				name='email'
				type='email'
				placeholder='E-mail'
				icon={'EditIcon'}
				value={fields.email}
				onChange={handleChange}
			/>
			<Input
				name='password'
				type={'password'}
				placeholder='Пароль'
				icon={'EditIcon'}
				spellCheck={false}
				value={fields.password}
				onChange={handleChange}
			/>
			<div className={styles.buttonsBlock}>
				<Button htmlType='reset' type='secondary'>
					Отмена
				</Button>
				<Button htmlType='submit'>Сохранить</Button>
			</div>
		</form>
	);
};
