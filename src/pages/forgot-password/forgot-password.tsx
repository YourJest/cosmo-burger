import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.scss';
import { useForm } from '../../hooks/useForm';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Pages } from '@utils/constant';
import { useForgotPasswordMutation } from '@services/norma/auth-api';

interface ForgotPasswordForm {
	email: string;
}

export const ForgotPasswordPage = () => {
	const navigate = useNavigate();
	const { fields, handleChange } = useForm<ForgotPasswordForm>({
		email: '',
	});
	const [triggerForgotPassword] = useForgotPasswordMutation();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		triggerForgotPassword(fields).then(() => {
			navigate(Pages.RESTORE_PASSWORD);
		});
	};

	return (
		<main className={styles.forgotPasswordPage}>
			<form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
				<p className='text text_type_main-medium'>Восстановление пароля</p>
				<Input
					name='email'
					type='email'
					placeholder='E-mail'
					value={fields.email}
					onChange={handleChange}
				/>
				<Button htmlType='submit'>Восстановить</Button>
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
