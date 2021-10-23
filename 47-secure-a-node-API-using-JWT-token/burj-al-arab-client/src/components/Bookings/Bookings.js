import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../App';

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loggedInUser /* setLoggedInUser */] = useContext(LoginContext);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`http://localhost:5000/bookings?email=` + loggedInUser.email, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			const data = await res.json();
			// console.log(data);
			setBookings(data);
		};
		fetchData();
	}, [loggedInUser]);

	return (
		<>
			<h4>you have {bookings.length} booking</h4>
			{bookings.map((book) => (
				<h6 key={book._id}>
					{book.name} from: {new Date(book.checkIn).toDateString('dd/mm/yyyy')} to: {new Date(book.checkOut).toDateString('dd/mm/yyyy')}
				</h6>
			))}
		</>
	);
};

export default Bookings;
