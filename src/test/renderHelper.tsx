import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../state/store';

export const renderWithProviders = (component: ReactElement) => {
	render(
		<Provider store={store}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);
};

export const renderWithMemoryRouter = (component: ReactElement, store: any, path: string) => {
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={[path]}>{component}</MemoryRouter>
		</Provider>
	);
};
