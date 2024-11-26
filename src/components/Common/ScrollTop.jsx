import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

const ScrollTop = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = window.scrollY;
		if (scrolled > 200) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisible);
		return () => {
			window.removeEventListener('scroll', toggleVisible);
		};
	}, []);

	return (
		<Button
			id='back-to-top'
			className='p-0'
			onClick={scrollToTop}
			style={{ display: visible ? 'inline' : 'none' }}
		>
			&#129045;
		</Button>
	);
};

export default ScrollTop;
