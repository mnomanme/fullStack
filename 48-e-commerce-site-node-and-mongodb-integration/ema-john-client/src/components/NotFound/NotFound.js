import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
	return (
		<Container>
			<h2 className="text-center text-danger m-5">SORRY! PAGE NOT FOUND</h2>
			<h1 className="text-center text-danger m-5">404! ERROR!!! NOT FOUND! PLEASE TRY AGAIN</h1>
		</Container>
	);
};

export default NotFound;
