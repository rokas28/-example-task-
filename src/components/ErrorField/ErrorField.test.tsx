import { render, screen } from '@testing-library/react';
import ErrorField from './ErrorField';

describe('ErrorField', () => {
	it('should display error message', () => {
		render(<ErrorField errorMessage={'test'} />);

		expect(screen.getByTestId('error-message')).toBeDefined();
	});

	it('should not display error message', () => {
		render(<ErrorField errorMessage={''} />);

		expect(screen.queryByTestId('error-message')).toBeNull();
	});
});
