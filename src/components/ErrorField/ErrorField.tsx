import React from 'react';
import './ErrorField.scss';

interface ErrorFieldProps {
	errorMessage: string;
}

const ErrorField: React.FC<ErrorFieldProps> = ({ errorMessage }) => {
	if (errorMessage) {
		return (
			<div className='error-field-container'>
				<div data-testid='error-message'>{errorMessage}</div>
			</div>
		);
	}

	return null;
};

export default ErrorField;
