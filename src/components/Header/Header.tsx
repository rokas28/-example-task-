import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../state/Slices/authSlice';
import { useAppDispatch } from '../../hooks/useReduxHooks';
import logoIcon from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import './Header.scss';

const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('TOKEN');
		navigate('/login');
	};

	return (
		<div className='header-container'>
			<img src={logoIcon} alt='logo' />
			<button className='logout' onClick={handleLogout}>
				<img src={logoutIcon} alt='logout' />
				Logout
			</button>
		</div>
	);
};

export default Header;
