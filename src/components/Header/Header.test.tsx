import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/renderHelper';
import Header from './Header';

describe('Header', () => {
	it('should handle logout', async () => {
		Object.defineProperty(window, 'localStorage', {
			value: {
				removeItem: jest.fn(() => null),
			},
			writable: true,
		});

		const user = userEvent.setup();

		renderWithProviders(<Header />);

		const button = screen.getByText('Logout');
		await user.click(button);

		expect(window.localStorage.removeItem).toHaveBeenCalledWith('TOKEN');
	});
});
