import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebaseConfig from './firebase.config';

export const app = () => {
	return initializeApp(firebaseConfig);
};

export const handleGoogleSignIn = () => {
	console.log('sign in');
	const googleProvider = new GoogleAuthProvider();
	// Authenticate with Firebase using the Google provider object
	const auth = getAuth();
	return signInWithPopup(auth, googleProvider)
		.then((result) => {
			console.log(result);
			const { displayName, email, photoURL } = result.user;
			console.log(displayName, email, photoURL);

			const signedInUser = {
				isSignedIn: true,
				name: displayName,
				email: email,
				photoURL: photoURL,
				success: true,
			};
			return signedInUser;
		})
		.catch((error) => {
			console.log(error);
		});
};

export const handleGoogleSignOut = () => {
	console.log('sign out');
	const auth = getAuth();
	return signOut(auth)
		.then(() => {
			const signedOutUser = {
				isSignedIn: false,
				name: '',
				email: '',
				photoURL: '',
				error: '',
				success: false,
			};
			return signedOutUser;
		})
		.catch((error) => {
			console.log(error);
		});
};

export const createUser = (name, email, password) => {
	const auth = getAuth();
	return createUserWithEmailAndPassword(auth, email, password)
		.then((res) => {
			const newUserInfo = res.user;
			newUserInfo.error = '';
			newUserInfo.success = true;
			updateUserName(name);
			console.log(res);
			return newUserInfo;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			return newUserInfo;
		});
};

export const signInUser = (email, password) => {
	// console.log(signInUser, email, password);
	const auth = getAuth();
	signInWithEmailAndPassword(auth, email, password)
		.then((res) => {
			const newUserInfo = res.user;
			console.log('newuser login inffo', newUserInfo);
			newUserInfo.error = '';
			newUserInfo.success = true;
			console.log('sign in user info', res.user);
			return newUserInfo;
		})
		.catch((error) => {
			const newUserInfo = {};
			newUserInfo.error = error.message;
			newUserInfo.success = false;
			console.log(error.message);
			return newUserInfo;
		});
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
