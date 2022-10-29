import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../test/renderHelper';
import ServersList from './ServersList';

const serversResponse = [
	{
		name: 'Lithuania #14',
		distance: 832,
	},
	{
		name: 'United States #39',
		distance: 1459,
	},
	{
		name: 'Singapore #64',
		distance: 1474,
	},
];

const serversResponse2 = [
	{
		name: 'Germany #40',
		distance: 122,
	},
	{
		name: 'United States #84',
		distance: 431,
	},
	{
		name: 'Lithuania #14',
		distance: 832,
	},
	{
		name: 'Latvia #60',
		distance: 682,
	},
	{
		name: 'United Kingdom #79',
		distance: 469,
	},
	{
		name: 'Latvia #10',
		distance: 741,
	},
	{
		name: 'Germany #36',
		distance: 556,
	},
	{
		name: 'United Kingdom #90',
		distance: 1423,
	},
	{
		name: 'United Kingdom #40',
		distance: 1233,
	},
	{
		name: 'United States #39',
		distance: 1459,
	},
	{
		name: 'Singapore #64',
		distance: 1474,
	},
	{
		name: 'United Kingdom #26',
		distance: 1930,
	},
];

describe('ServersList', () => {
	const server = setupServer();

	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it('should display list heading', () => {
		renderWithProviders(<ServersList />);

		expect(screen.getByText('Name')).toBeDefined();
		expect(screen.getByText('Distance')).toBeDefined();
	});

	it('should display list', async () => {
		server.use(
			rest.get('https://playground.oxylabs.io/api/servers', (req, res, ctx) => {
				return res(ctx.json(serversResponse));
			})
		);

		renderWithProviders(<ServersList />);

		expect(await screen.findByText('Lithuania #14')).toBeInTheDocument();
		expect(await screen.findByText('832')).toBeInTheDocument();

		expect(await screen.findByText('United States #39')).toBeInTheDocument();
		expect(await screen.findByText('1459')).toBeInTheDocument();

		expect(await screen.findByText('Singapore #64')).toBeInTheDocument();
		expect(await screen.findByText('1474')).toBeInTheDocument();
	});

	it('should handle pagination', async () => {
		server.use(
			rest.get('https://playground.oxylabs.io/api/servers', (req, res, ctx) => {
				return res(ctx.json(serversResponse2));
			})
		);

		const user = userEvent.setup();

		renderWithProviders(<ServersList />);

		expect(await screen.findByText('Germany #40')).toBeInTheDocument();
		expect(await screen.findByText('122')).toBeInTheDocument();

		expect(await screen.findByText('United States #84')).toBeInTheDocument();
		expect(await screen.findByText('431')).toBeInTheDocument();

		const button = screen.getByRole('button', { name: 'Next page' });
		await user.click(button);

		expect(await screen.findByText('Singapore #64')).toBeInTheDocument();
		expect(await screen.findByText('1474')).toBeInTheDocument();

		expect(await screen.findByText('United Kingdom #26')).toBeInTheDocument();
		expect(await screen.findByText('1930')).toBeInTheDocument();
	});
});
