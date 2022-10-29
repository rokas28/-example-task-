import { screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../state/Slices/authSlice';
import Status from '../enums/statusEnum';
import serversReducer from '../state/Slices/serversSlice';
import { renderWithMemoryRouter } from '../test/renderHelper';
import App from './App';

const store = configureStore({
	reducer: {
		auth: authReducer,
		servers: serversReducer,
	},
	preloadedState: {
		auth: {
			token: 'testToken',
			status: Status.COMPLETED,
			error: '',
		},
	},
});

const store2 = configureStore({
	reducer: {
		auth: authReducer,
		servers: serversReducer,
	},
	preloadedState: {
		auth: {
			token: '',
			status: Status.IDLE,
			error: '',
		},
	},
});

describe('App', () => {
	it('should handle protected route', () => {
		renderWithMemoryRouter(<App />, store, '/');

		expect(screen.getByTestId('servers-list-container')).toBeDefined();
	});

	it('should handle redirect to login', () => {
		renderWithMemoryRouter(<App />, store2, '/');

		expect(screen.getByTestId('login-form')).toBeDefined();
	});
});
