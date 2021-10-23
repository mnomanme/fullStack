import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useHistory, useLocation } from 'react-router';

const AuthRegister = (props) => {
	// console.log(props);
	// console.log(props.user);
	const [newUser, setNewUser] = useState(false);

	const user = props.user;
	const setUser = props.setUser;

	const loggedInUser = props.loggedInUser;
	const setLoggedInUser = props.setLoggedInUser;

	const history = useHistory();
	const location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };

	const handleSubmit = (e) => {
		// console.log('submit');
		// console.log('form submit', user.email, user.password);

		if (newUser && user.email && user.password) {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, user.email, user.password)
				.then((res) => {
					const newUserInfo = { ...user };
					newUserInfo.error = '';
					newUserInfo.success = true;
					setUser(newUserInfo);
					setLoggedInUser(newUserInfo);
					updateUserName(user.name);
					history.replace(from);
				})
				.catch((error) => {
					const newUserInfo = { ...user };
					newUserInfo.error = error.message;
					newUserInfo.success = false;
					setUser(newUserInfo);
				});
		}

		if (!newUser && user.email && user.password) {
			const auth = getAuth();
			signInWithEmailAndPassword(auth, user.email, user.password)
				.then((res) => {
					const newUserInfo = { ...user };
					newUserInfo.error = '';
					newUserInfo.success = true;
					setUser(newUserInfo);
					setLoggedInUser(newUserInfo);
					history.replace(from);
					console.log('sign in user info', res.user);
				})
				.catch((error) => {
					const newUserInfo = { ...user };
					newUserInfo.error = error.message;
					newUserInfo.success = false;
					setUser(newUserInfo);
				});
		}
		e.preventDefault();
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

	const updateUserName = (name) => {
		const auth = getAuth();
		updateProfile(auth.currentUser, {
			displayName: name,
		})
			.then(() => {
				console.log('user name updated successfully');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<p>Name: {user.name}</p>
			<p>Email: {user.email}</p>
			<p>Password: {user.password}</p>
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
		</>
	);
};

export default AuthRegister;
