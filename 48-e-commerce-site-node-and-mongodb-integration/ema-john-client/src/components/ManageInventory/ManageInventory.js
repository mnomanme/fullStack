import React from 'react';
import { Button, Container } from 'react-bootstrap';

const ManageInventory = () => {
	const handleAddProduct = () => {
		const product = {};

		const fetchData = async () => {
			const res = await fetch(`https://store-ema-john.herokuapp.com/addProducts`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(product),
			});
			console.log(res);
			// const data = await res.json();
			// console.log(data);
		};
		fetchData();
	};

	return (
		<Container>
			<form action="">
				<p>
					<span>Name:</span>
					<input type="text" />
				</p>
				<p>
					<span>Price:</span>
					<input type="text" />
				</p>
				<p>
					<span>Qunatity:</span>
					<input type="text" />
				</p>
				<p>
					<span>Product Image:</span>
					<input type="file" />
				</p>
				<Button onClick={handleAddProduct} variant="outline-success">
					Add Product
				</Button>
			</form>
		</Container>
	);
};

export default ManageInventory;
