import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

export const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	return (
		<>
			{/* <section class="w-25">
				<div class="form-group">
					<label for="Price">Price</label>
					<input type="text" class="form-control" id="price" placeholder="price" />
				</div>
				<div class="form-group">
					<label for="Quantity">Quantity</label>
					<input type="text" class="form-control" id="quantity" placeholder="quantity" />
				</div>
				<button type="submit" class="btn btn-sm btn-outline-info">
					Update Product
				</button>
			</section> */}
			<h2>Users Available {users.length}</h2>
			{users.map((user) => {
				return (
					<Container key={user._id} className="text-center">
						<strong>Name: {user.name}</strong> <small>Email: {user.email}</small>
						<button className="btn btn-sm btn-outline-warning m-2">update</button>
						<button className="btn btn-sm btn-outline-danger">delete</button>
					</Container>
				);
			})}
		</>
	);
};
