import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './restore-password.module.scss';
import { useForm } from '../../hooks/useForm';
import { FormEvent, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Pages } from '@utils/constant';
import { useResetPasswordMutation } from '@services/norma/auth-api';

interface RestorePasswordForm {
	password: string;
	token: string;
}

export const RestorePasswordPage = () => {
	const navigate = useNavigate();

	const { fields, handleChange } = useForm<RestorePasswordForm>({
		password: '',
		token: '',
	});
	const [triggerRestorePassword] = useResetPasswordMutation();

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		triggerRestorePassword(fields).then(() => {
			navigate(Pages.LOGIN);
		});
	};

	if (!localStorage.getItem('resetPasswordRequested')) {
		return <Navigate to={Pages.FORGOT_PASSWORD} />;
	}

	return (
		<main className={styles.restorePasswordPage}>
			<form className={styles.restorePasswordForm} onSubmit={handleSubmit}>
				<p className='text text_type_main-medium'>Восстановление пароля</p>
				<Input
					name='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Введите новый пароль'
					icon={showPassword ? 'HideIcon' : 'ShowIcon'}
					onIconClick={() => setShowPassword(!showPassword)}
					spellCheck={false}
					value={fields.password}
					onChange={handleChange}
				/>
				<Input
					name='token'
					type={'text'}
					placeholder='Введите код из письма'
					spellCheck={false}
					value={fields.token}
					onChange={handleChange}
				/>
				<Button htmlType='submit'>Сохранить</Button>
			</form>
			<div className={styles.additionalInfo}>
				<div className={styles.infoRow}>
					<p className='text text_type_main-small text_color_inactive'>
						Вспомнили пароль?
					</p>
					<Link
						to={Pages.LOGIN}
						className={clsx('text text_type_main-small', styles.link)}>
						Войти
					</Link>
				</div>
			</div>
		</main>
	);
};
