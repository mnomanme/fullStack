import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { userContext } from '../Layouts/Layouts';
import AuthRegister from './AuthRegister';
import firebaseConfig from './firebase.config';

const Login = () => {
	const app = initializeApp(firebaseConfig);
	console.log(app);

	const googleProvider = new GoogleAuthProvider();

	const [user, setUser] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		photoURL: '',
	});

	// context API
	const [loggedInUser, setLoggedInUser] = useContext(userContext);

	// google sign in user
	const handleSignIn = () => {
		console.log('sign in');

		// Authenticate with Firebase using the Google provider object
		const auth = getAuth();
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				console.log(result);
				const { displayName, email, photoURL } = result.user;
				console.log(displayName, email, photoURL);

				const signedInUser = {
					isSignedIn: true,
					name: displayName,
					email: email,
					photoURL: photoURL,
				};
				setUser(signedInUser);
				setLoggedInUser(signedInUser);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// google sign out user
	const handleSignOut = () => {
		console.log('sign out');
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				const signedOutUser = {
					isSignedIn: false,
					name: '',
					email: '',
					photoURL: '',
					error: '',
					success: false,
				};
				setUser(signedOutUser);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<section className="m-2 text-center">
			{user.isSignedIn ? (
				<button onClick={handleSignOut} className="btn btn-outline-info btn-lg">
					Sign Out
				</button>
			) : (
				<button onClick={handleSignIn} className="btn btn-outline-info btn-lg">
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
			<section className="my-2">
				<AuthRegister user={user} setUser={setUser} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
			</section>
		</section>
	);
};

export default Login;
