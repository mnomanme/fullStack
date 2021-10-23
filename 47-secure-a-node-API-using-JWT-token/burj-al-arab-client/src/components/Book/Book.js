import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LoginContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
	const { bedType } = useParams();

	const [loggedInUser /* setLoggedInUser */] = useContext(LoginContext);

	const [selectedDate, setSelectedDate] = useState({
		checkIn: new Date(),
		checkOut: new Date(),
	});

	const handleCheckInDate = (date) => {
		const newDate = { ...selectedDate };
		newDate.checkIn = date;
		setSelectedDate(newDate);
	};

	const handleCheckOutDate = (date) => {
		const newDate = { ...selectedDate };
		newDate.checkOut = date;
		setSelectedDate(newDate);
	};

	const handleBooking = async () => {
		console.log('book now');
		const newBooking = { ...loggedInUser, ...selectedDate };

		const res = await fetch(`http://localhost:5000/addBooking`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newBooking),
		});

		const data = await res.json();
		console.log(data);
	};

	return (
		<section style={{ textAlign: 'center' }}>
			<h1>
				Hello, {loggedInUser.name}! Let's book a {bedType} Room.
			</h1>
			<p>
				Want a <Link to="/home">different room?</Link>
			</p>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Grid container justify="space-around">
					<KeyboardDatePicker
						format="dd/MM/yyyy"
						margin="normal"
						id="date-picker-dialog"
						label="Check In Date"
						value={selectedDate.checkIn}
						onChange={handleCheckInDate}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
					<KeyboardDatePicker
						margin="normal"
						id="date-picker-dialog"
						label="Check Out Date"
						format="dd/MM/yyyy"
						value={selectedDate.checkOut}
						onChange={handleCheckOutDate}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</Grid>
				<Button onClick={handleBooking} variant="contained" color="secondary">
					Book Now
				</Button>
			</MuiPickersUtilsProvider>
			<Bookings />
		</section>
	);
};

export default Book;
