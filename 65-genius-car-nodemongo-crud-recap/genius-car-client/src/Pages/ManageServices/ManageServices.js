import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
export const ManageServices = () => {
	const [services, setservices] = useState([]);

	useEffect(() => {
		axios(`http://localhost:4000/services`).then((res) => {
			console.log(res.data);
			setservices(res.data);
		});
	}, []);

	const handleDelete = (id) => {
		const url = `http://localhost:4000/services/${id}`;
		axios(url, {
			method: 'DELETE',
		}).then((res) => {
			console.log(res.data);
			if (res.data.deletedCount) {
				alert('Delete Successfully');
				const remaining = services.filter((service) => service._id !== id);
				setservices(remaining);
			}
		});
	};

	return (
		<>
			<h2>This is ManageServices</h2>
			{services.map((service) => {
				return (
					<section key={service._id}>
						<strong>{service.name}</strong>
						<Button onClick={() => handleDelete(service._id)} variant="outline-danger" size="sm" className="m-2">
							delete
						</Button>
					</section>
				);
			})}
		</>
	);
};
