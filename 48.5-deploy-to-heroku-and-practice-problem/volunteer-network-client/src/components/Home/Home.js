import React, { useEffect, useState } from 'react';
import { Event } from '../Event/Event';

export const Home = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch('http:localhost/5000/events')
			.then((res) => res.json())
			.then((data) => setEvents(data));
	}, []);

	return (
		<div>
			<h2>This is Home</h2>
			{events.map((event) => (
				<Event></Event>
			))}
		</div>
	);
};
