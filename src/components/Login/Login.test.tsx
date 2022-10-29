import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../test/renderHelper';
import Login from './Login';

describe('Login', () => {
	const server = setupServer();

	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it('should handle form inputs', async () => {
		const user = userEvent.setup();

		renderWithProviders(<Login />);

		const inputUsername = screen.getByPlaceholderText('Username');
		await user.type(inputUsername, 'test1');

		const inputPassword = screen.getByPlaceholderText('Password');
		await user.type(inputPassword, 'test2');

		expect(inputUsername).toHaveValue('test1');
		expect(inputPassword).toHaveValue('test2');
	});

	it('should log in user', async () => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: jest.fn(() => null),
				setItem: jest.fn(() => null),
			},
			writable: true,
		});

		server.use(
			rest.post('https://playground.oxylabs.io/api/user/login', (req, res, ctx) => {
				return res(ctx.json({ token: 'testToken' }));
			})
		);

		const user = userEvent.setup();

		renderWithProviders(<Login />);

		const inputUsername = screen.getByPlaceholderText('Username');
		await user.type(inputUsername, 'test');

		const inputPassword = screen.getByPlaceholderText('Password');
		await user.type(inputPassword, 'test');

		const button = screen.getByText('Log in');
		await user.click(button);

		expect(window.localStorage.setItem).toHaveBeenCalledWith('TOKEN', 'testToken');
	});

	it('should handle empty username error message', async () => {
		const user = userEvent.setup();

		renderWithProviders(<Login />);

		const inputUsername = screen.getByPlaceholderText('Username');
		await user.type(inputUsername, 'test');

		const button = screen.getByText('Log in');
		await user.click(button);

		expect(await screen.findByTestId('error-message')).toBeDefined();
	});

	it('should handle empty password error message', async () => {
		const user = userEvent.setup();

		renderWithProviders(<Login />);

		const inputPassword = screen.getByPlaceholderText('Password');
		await user.type(inputPassword, 'test');

		const button = screen.getByText('Log in');
		await user.click(button);

		expect(await screen.findByTestId('error-message')).toBeDefined();
	});

	it('should handle failed login', async () => {
		server.use(
			rest.post('https://playground.oxylabs.io/api/user/login', (req, res, ctx) => {
				return res(ctx.json('Invalid credentials'), ctx.status(400));
			})
		);

		const user = userEvent.setup();

		renderWithProviders(<Login />);

		const usernameIinput = screen.getByPlaceholderText('Username');
		await user.type(usernameIinput, 'test');

		const passwordIinput = screen.getByPlaceholderText('Password');
		await user.type(passwordIinput, 'test');

		const button = screen.getByText('Log in');
		await user.click(button);

		expect(await screen.findByTestId('error-message')).toBeDefined();
	});
});
