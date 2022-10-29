import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useReduxHooks';

interface ProtectedRouteProps {
	children?: React.ReactElement<any, any> | null;
	redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectPath }) => {
	const token = useAppSelector((state) => state.auth.token);

	if (!token) {
		return <Navigate to={redirectPath} replace />;
	}

	return children ? children : <Outlet />;
};

export default ProtectedRoute;
