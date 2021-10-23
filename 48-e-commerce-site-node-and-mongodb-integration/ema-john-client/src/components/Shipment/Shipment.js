import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { getDatabaseCart, processOrder } from '../../resources/utilities/databaseManager';
import { userContext } from '../Layouts/Layouts';

const Shipment = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [loggedInUser, setLoggedInUser] = useContext(userContext);

	const onSubmit = (data) => {
		const savedCart = getDatabaseCart();
		const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };

		fetch(`http://localhost:5000/addOrders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderDetails),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				processOrder();
				console.log(data);
				alert('your order placed successfully');
			});
	};

	console.log(watch('example'));

	return (
		<Container className="my-2">
			<form onSubmit={handleSubmit(onSubmit)} className="ship-form">
				<input defaultValue={loggedInUser.name} {...register('name', { required: true })} className="mx-auto w-50 form-control" placeholder="your name" />
				{errors.name && <span className="text-danger">name is required</span>}
				<br />
				<input defaultValue={loggedInUser.email} {...register('email', { required: true })} className="mx-auto w-50 form-control" placeholder="your email" />
				{errors.email && <span className="text-danger">email is required</span>}
				<br />
				<input {...register('address', { required: true })} className="mx-auto w-50 form-control" placeholder="your address" />
				{errors.address && <span className="text-danger">address is required</span>}
				<br />
				<input {...register('phoneNumber', { required: true })} className="mx-auto w-50 form-control" placeholder="your phone number" />
				{errors.phoneNumber && <span className="text-danger">phoneNumber is required</span>}
				<br />
				<input type="submit" className="mx-auto w-50 form-control" />
			</form>
		</Container>
	);
};

export default Shipment;
