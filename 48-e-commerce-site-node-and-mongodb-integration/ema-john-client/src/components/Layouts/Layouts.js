import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';
import Shop from '../Shop/Shop';
import Review from '../Review/Review';
import ManageInventory from '../ManageInventory/ManageInventory';
import NotFound from '../NotFound/NotFound';
import ProductDetails from '../ProductDetails/ProductDetails';
import Shipment from '../Shipment/Shipment';
import Login from '../Login/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const userContext = createContext();

const Layouts = () => {
	const [loggedInUser, setLoggedInUser] = useState({});
	return (
		<userContext.Provider value={[loggedInUser, setLoggedInUser]}>
			<Router>
				<Container>
					<h5 className="bg-info rounded text-center">email: {loggedInUser?.email}</h5>
				</Container>
				<Header />
				<Switch>
					<Route path="/shop">
						<Shop />
					</Route>
					<Route path="/review">
						<Review />
					</Route>
					<PrivateRoute path="/inventory">
						<ManageInventory />
					</PrivateRoute>
					<Route path="/login">
						<Login />
					</Route>
					<PrivateRoute path="/shipment">
						<Shipment />
					</PrivateRoute>
					<Route exact path="/">
						<Shop />
					</Route>
					<Route path="/product/:productKey">
						<ProductDetails />
					</Route>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</userContext.Provider>
	);
};

export default Layouts;
