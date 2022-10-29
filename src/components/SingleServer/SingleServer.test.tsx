import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/renderHelper';
import SingleServer from './SingleServer';

describe('SingleServer', () => {
	it('should display server item', () => {
		renderWithProviders(<SingleServer server={{ name: 'test', distance: 0 }} />);

		expect(screen.getByText('test')).toBeDefined();
		expect(screen.getByText('0')).toBeDefined();
	});
});
