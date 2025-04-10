import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.scss';
import { useForm } from '../../hooks/useForm';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Pages } from '@utils/constant';
import { useRegisterMutation } from '@services/norma/auth-api';

interface RegisterForm {
	email: string;
	password: string;
	name: string;
}

export const RegisterPage = () => {
	const [trigger] = useRegisterMutation();
	const { fields, handleChange } = useForm<RegisterForm>({
		email: '',
		password: '',
		name: '',
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		trigger(fields);
	};

	return (
		<main className={styles.registerPage}>
			<form className={styles.registerForm} onSubmit={handleSubmit}>
				<p className='text text_type_main-medium'>Регистрация</p>
				<Input
					name='name'
					type='text'
					placeholder='Имя'
					value={fields.name}
					onChange={handleChange}
				/>
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
				<Button htmlType='submit'>Зарегистрироваться</Button>
			</form>
			<div className={styles.additionalInfo}>
				<div className={styles.infoRow}>
					<p className='text text_type_main-small text_color_inactive'>
						Уже зарегистрированы?
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
