import React, { useState, useEffect } from 'react';
import { useDevice } from 'vtex.device-detector';
import { Button } from 'vtex.styleguide';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import PropTypes from 'prop-types';

export const GoTopButton = ({ topPixel }) => {
	const [ bodyOffset, setBodyOffset ] = useState(document.body.getBoundingClientRect());
	const [ scrollY, setScrollY ] = useState(bodyOffset.top);

	const { isMobile } = useDevice();

	if (!isMobile) {
		return null;
	}

	const listener = () => {
		setBodyOffset(document.body.getBoundingClientRect());
		setScrollY(-bodyOffset.top);
	};

	useEffect(() => {
		window.addEventListener('scroll', listener);
		return () => {
			window.removeEventListener('scroll', listener);
		};
	});

	const rigthPosition = scrollY > topPixel ? '10px' : '-100%';

	const handleBackTop = () => {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};

	return (
		<div className={styles.goTopButtonContainer} style={{ right: rigthPosition }}>
			<Button onClick={handleBackTop} size="regular">
				<FormattedMessage id="store/editor.action-go-to" />
			</Button>
		</div>
	);
};

GoTopButton.prototype = {
	topPixel: PropTypes.number
};

GoTopButton.defaultProps = {
	topPixel: 1000
};

GoTopButton.schema = {
	title: 'admin/editor.toTop.title',
	description: 'admin/editor.toTop.description',
	type: 'object',
	properties: {
		topPixel: {
			title: 'admin/editor.toTop.topPixel.title',
			description: 'admin/editor.toTop.topPixel.description',
			type: 'number'
		}
	}
};
