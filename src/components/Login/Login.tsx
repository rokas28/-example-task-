import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useReduxHooks';
import { userLogin, addError } from '../../state/Slices/authSlice';
import Status from '../../enums/statusEnum';
import logoIcon from '../../assets/login-logo.svg';
import ErrorField from '../ErrorField/ErrorField';
import './Login.scss';

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const errorMessage = useAppSelector((state) => state.auth.error);
	const status = useAppSelector((state) => state.auth.status);

	const isLoading = () => status === Status.LOADING;

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { username, password } = e.currentTarget;

		if (username?.value.length === 0) {
			dispatch(addError('Username field is empty'));
			return;
		}

		if (password?.value.length === 0) {
			dispatch(addError('Password field is empty'));
			return;
		}

		const loginValues = {
			username: username?.value,
			password: password?.value,
			navigate,
		};

		dispatch(userLogin(loginValues));
	};

	return (
		<div className='login-container'>
			<div className='login-wrapper'>
				<img src={logoIcon} alt='logo' className='logo-icon' />
				<div className='login-error'>
					<ErrorField errorMessage={errorMessage} />
				</div>
				<form className='login-form' data-testid='login-form' onSubmit={(e) => handleFormSubmit(e)}>
					<input id='username' className='input username-input' placeholder='Username' />
					<input
						id='password'
						className='input password-input'
						type='password'
						placeholder='Password'
					/>
					<button className='button' type='submit' disabled={isLoading()}>
						{isLoading() ? 'Loading...' : 'Log in'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
