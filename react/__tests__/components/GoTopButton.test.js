import React from 'react';

import GoTopButton from '../../GoTopButton';
import { render } from '@vtex/test-tools/react';

describe('<GoTopButton /> component', () => {
	const renderComponent = (customProps) => {
		const comp = <GoTopButton {...customProps}>Test</GoTopButton>;

		return render(comp);
	};

	it('should be rendered', () => {
		const { asFragment } = renderComponent();
		expect(asFragment()).toBeTruthy();
	});
});
