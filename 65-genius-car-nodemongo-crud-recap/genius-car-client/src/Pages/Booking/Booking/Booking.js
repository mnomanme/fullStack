import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
	const { serviceId } = useParams();

	const [service, setService] = useState({});

	useEffect(() => {
		fetch(`http://localhost:4000/services/${serviceId}`)
			.then((res) => res.json())
			.then((data) => {
				setService(data);
			});
	}, [serviceId]);

	return (
		<>
			<h2>this is booking: {serviceId}</h2>
			<h4>Details of {service.name}</h4>
		</>
	);
};

export default Booking;
