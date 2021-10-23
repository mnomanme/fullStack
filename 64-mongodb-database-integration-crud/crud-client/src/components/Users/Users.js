import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/users`)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	// DELETE AN USER
	const handleDeleteUser = (id) => {
		const proceed = window.confirm('Are you sure? you want to delete?');

		if (proceed) {
			const url = `http://localhost:5000/users/${id}`;
			fetch(url, {
				method: 'DELETE',
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						alert('User deleted successfully');
						const remainingusers = users.filter((user) => user._id !== id);
						setUsers(remainingusers);
					}
				});
		}
	};

	return (
		<>
			<h2>Users Available {users.length}</h2>
			{users.map((user) => {
				return (
					<Container key={user._id} className="text-center">
						<strong>Name: {user.name}</strong> <small>Email: {user.email}</small>
						<Link to={`/users/update/${user._id}`}>
							<Button variant="outline-warning" size="sm" className="m-1">
								update
							</Button>
						</Link>
						<Button onClick={() => handleDeleteUser(user._id)} variant="outline-danger" size="sm" className="m-1">
							delete
						</Button>
					</Container>
				);
			})}
		</>
	);
};
