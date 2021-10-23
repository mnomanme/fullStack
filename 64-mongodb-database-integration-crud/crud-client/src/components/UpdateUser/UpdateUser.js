import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const UpdateUser = () => {
	const { id } = useParams();

	const [user, setUser] = useState({});

	useEffect(() => {
		const url = `http://localhost:5000/users/${id}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setUser(data);
				console.log(data);
			});
	}, [id]);

	return (
		<>
			<h2>This is update user {id}</h2>
			<h4>{user.name}</h4>
		</>
	);
};
