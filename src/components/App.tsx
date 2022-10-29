import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login/Login';
import ServersList from './ServersList/ServersList';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route element={<ProtectedRoute redirectPath='/login' />}>
				<Route path='/' element={<ServersList />} />
			</Route>
		</Routes>
	);
};

export default App;
