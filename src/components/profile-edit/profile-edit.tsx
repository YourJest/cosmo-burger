import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.edit.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { getUser } from '@services/user/slice';
import { useUpdateUserMutation } from '@services/norma/auth-api';
import { useAppSelector } from '@components/app/hooks';

interface ProfileEditForm {
	name: string;
	email: string;
	password: string;
}

export const ProfileEdit = () => {
	const user = useAppSelector(getUser);
	const [triggerUserUpdate] = useUpdateUserMutation();
	const { fields, handleChange, resetForm } = useForm<ProfileEditForm>({
		name: user?.name ?? '',
		email: user?.email ?? '',
		password: '',
	});

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [editingField, setEditingField] = useState<
		keyof ProfileEditForm | null
	>(null);
	const [showPassword, setShowPassword] = useState(false);

	const isUserChanged =
		user?.name !== fields.name ||
		user.email !== fields.email ||
		fields.password !== '';

	const handleResetForm = () => {
		setEditingField(null);
		resetForm();
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const updatedFields: Partial<ProfileEditForm> = {};
		if (fields.name !== user?.name) {
			updatedFields.name = fields.name;
		}
		if (fields.email !== user?.email) {
			updatedFields.email = fields.email;
		}
		if (fields.password !== '') {
			updatedFields.password = fields.password;
		}
		triggerUserUpdate(updatedFields);
		setEditingField(null);
	};

	useEffect(() => {
		switch (editingField) {
			case 'email':
				emailRef.current?.focus();
			case 'name':
				nameRef.current?.focus();
				break;
			case 'password':
				passwordRef.current?.focus();
				break;
			default:
				break;
		}
		if (editingField !== 'password') {
			setShowPassword(false);
		}
	}, [editingField]);

	return (
		<form className={styles.profileEdit} onSubmit={handleSubmit}>
			<Input
				ref={nameRef}
				name='name'
				type='text'
				placeholder='Имя'
				disabled={editingField !== 'name'}
				icon={'EditIcon'}
				onIconClick={() => {
					setEditingField(editingField === 'name' ? null : 'name');
				}}
				value={fields.name}
				onChange={handleChange}
			/>
			<Input
				ref={emailRef}
				name='email'
				type='email'
				placeholder='E-mail'
				disabled={editingField !== 'email'}
				icon={'EditIcon'}
				onIconClick={() => {
					setEditingField(editingField === 'email' ? null : 'email');
				}}
				value={fields.email}
				onChange={handleChange}
			/>
			<Input
				ref={passwordRef}
				name='password'
				type={showPassword ? 'text' : 'password'}
				placeholder='Пароль'
				disabled={editingField !== 'password'}
				icon={
					editingField !== 'password'
						? 'EditIcon'
						: showPassword
						? 'HideIcon'
						: 'ShowIcon'
				}
				onIconClick={() => {
					if (editingField !== 'password') {
						setEditingField('password');
					} else {
						setShowPassword(!showPassword);
					}
				}}
				spellCheck={false}
				value={fields.password}
				onChange={handleChange}
			/>
			{isUserChanged && (
				<div className={styles.buttonsBlock}>
					<Button htmlType='reset' type='secondary' onClick={handleResetForm}>
						Отмена
					</Button>
					<Button htmlType='submit'>Сохранить</Button>
				</div>
			)}
		</form>
	);
};
