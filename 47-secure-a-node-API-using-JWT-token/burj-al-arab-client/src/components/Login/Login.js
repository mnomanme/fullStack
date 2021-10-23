import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { LoginContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import firebaseConfig from './firebase.config';

const Login = () => {
	const [, /*loggedInUser*/ setLoggedInUser] = useContext(LoginContext);

	const app = initializeApp(firebaseConfig);
	console.log(app);

	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: '/' } };

	const handleGoogleSignIn = () => {
		// console.log('sign in google');

		const googleProvider = new GoogleAuthProvider();

		const auth = getAuth();
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const { displayName, email } = result.user;
				const signInUser = { name: displayName, email: email };
				setLoggedInUser(signInUser);
				storeAuthToken();
				// console.log(signInUser);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	const storeAuthToken = () => {
		getAuth()
			.currentUser.getIdToken(true)
			.then((idToken) => {
				// console.log(idToken);
				sessionStorage.setItem('token', idToken);
				history.replace(from);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Container className="text-center my-3">
			<Button onClick={handleGoogleSignIn} variant="outline-secondary">
				Google Sign In
			</Button>
		</Container>
	);
};

export default Login;
