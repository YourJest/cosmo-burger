import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.scss';
import { useForm } from '../../hooks/useForm';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Pages } from '@utils/constant';
import { useLoginMutation } from '@services/norma/auth-api';

interface LoginForm {
	email: string;
	password: string;
}

export const LoginPage = () => {
	const [trigger] = useLoginMutation();
	const { fields, handleChange } = useForm<LoginForm>({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		trigger(fields);
	};

	return (
		<main className={styles.loginPage}>
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<p className='text text_type_main-medium'>Вход</p>
				<Input
					name='email'
					type='email'
					placeholder='E-mail'
					value={fields.email}
					onChange={handleChange}
				/>
				<Input
					name='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Пароль'
					icon={showPassword ? 'HideIcon' : 'ShowIcon'}
					onIconClick={() => setShowPassword(!showPassword)}
					spellCheck={false}
					value={fields.password}
					onChange={handleChange}
				/>
				<Button htmlType='submit'>Войти</Button>
			</form>
			<div className={styles.additionalInfo}>
				<div className={styles.infoRow}>
					<p className='text text_type_main-small text_color_inactive'>
						Вы — новый пользователь?
					</p>
					<Link
						to={Pages.REGISTER}
						className={clsx('text text_type_main-small', styles.link)}>
						Зарегистрироваться
					</Link>
				</div>
				<div className={styles.infoRow}>
					<p className='text text_type_main-small text_color_inactive'>
						Забыли пароль?
					</p>
					<Link
						to={Pages.FORGOT_PASSWORD}
						className={clsx('text text_type_main-small', styles.link)}>
						Восстановить пароль
					</Link>
				</div>
			</div>
		</main>
	);
};
