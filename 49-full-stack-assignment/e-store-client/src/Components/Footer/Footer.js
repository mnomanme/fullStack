import React from 'react';

const Footer = () => {
	const footer = {
		textAlign: 'center',
		color: 'teal',
		marginTop: '50px',
	};

	return (
		<div style={footer}>
			<p>
				&copy;
				<a href="https://www.linkedin.com/in/mohammadnomanme/" target="_blank" rel="noreferrer">
					Mohammad Noman
				</a>
				|| All rights reserved <small> 2021 </small>
			</p>
		</div>
	);
};
export default Footer;
