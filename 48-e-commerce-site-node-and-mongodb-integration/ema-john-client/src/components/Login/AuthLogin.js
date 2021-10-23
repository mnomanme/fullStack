import React, { useContext, useState } from 'react';
import { userContext } from '../Layouts/Layouts';
import { useHistory, useLocation } from 'react-router';
import { app, createUser, handleGoogleSignIn, handleGoogleSignOut, signInUser } from './LoginManager';

const AuthLogin = () => {
	const [user, setUser] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		photoURL: '',
	});

	// login manager
	app();

	// context API
	const [loggedInUser, setLoggedInUser] = useContext(userContext);

	const [newUser, setNewUser] = useState(false);

	const history = useHistory();
	const location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };

	const googleSignIn = () => {
		handleGoogleSignIn().then((res) => {
			handleResponse(res, true);
		});
	};
	const googleSignOut = () => {
		handleGoogleSignOut().then((res) => {
			handleResponse(res, false);
		});
	};

	const handleResponse = (res, redirect) => {
		setUser(res);
		console.log(res);
		setLoggedInUser(res);
		if (redirect) {
			history.replace(from);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log('submit');
		// console.log('form submit', user.email, user.password);

		if (newUser && user.email && user.password) {
			createUser(user.name, user.email, user.password).then((res) => {
				console.log(res);
				handleResponse(res, true);
			});
		}

		if (!newUser && user.email && user.password) {
			console.log('sign in user');
			signInUser(user.email, user.password).then((res) => {
				console.log(res);
				// handleResponse(res, true);
			});
			// signInUser(user.email, user.password);
		}
	};

	const handleBlur = (event) => {
		// console.log(event.target.value);
		let isFieldValid = true;

		if (event.target.name === 'email') {
			isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
			// const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
			// console.log(isEmailValid);
		}
		if (event.target.name === 'password') {
			const isPasswordValid = event.target.value.length > 6;
			const passHasNumber = /\d{1}/.test(event.target.value);
			isFieldValid = isPasswordValid && passHasNumber;
			// console.log(isPasswordValid);
			// console.log(isPasswordValid && passHasNumber);
		}
		if (isFieldValid) {
			const newUserInfo = { ...user };
			newUserInfo[event.target.name] = event.target.value;
			setUser(newUserInfo);
			// console.log(newUserInfo);
		}
	};

	return (
		<section className="m-2 text-center">
			{user.isSignedIn ? (
				<button onClick={googleSignOut} className="btn btn-outline-info btn-lg">
					Sign Out
				</button>
			) : (
				<button onClick={googleSignIn} className="btn btn-outline-info btn-lg">
					Sign In
				</button>
			)}
			<br />
			{user.isSignedIn ? (
				<section>
					<h2>Welcome, {user.name}</h2>
					<p>Your email: {user.email}</p>
					<img className="w-25" src={user.photoURL} alt="userPhoto" />
				</section>
			) : (
				false
			)}
			<br />
			<p>Name: {user.name}</p>
			<p>Email: {user.email}</p>
			{/* <p>Password: {user.password}</p> */}
			<br />
			<input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
			<label htmlFor="newUser">New User Sign Up</label>

			<form onSubmit={handleSubmit}>
				{newUser && <input onBlur={handleBlur} type="text" name="name" id="" placeholder="your name" className="form-control mx-auto w-25" />}
				<br />
				<input onBlur={handleBlur} type="text" name="email" id="" placeholder="your email" className="form-control mx-auto w-25" required />
				<br />
				<input onBlur={handleBlur} type="password" name="password" id="" placeholder="your password" className="form-control mx-auto w-25" required />
				<br />
				<input className="btn btn-info" type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
			</form>
			<br />
			<p className="text-danger">{user.error}</p>
			{user.success && <p className="text-success">User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
		</section>
	);
};

export default AuthLogin;
