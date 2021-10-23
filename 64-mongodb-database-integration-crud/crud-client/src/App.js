import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AddUser } from './components/AddUser/AddUser';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { UpdateUser } from './components/UpdateUser/UpdateUser';
import { Users } from './components/Users/Users';

const App = () => {
	return (
		<Container>
			<h2>This is APP</h2>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/users">
						<Users />
					</Route>

					<Route exact path="/users/add">
						<AddUser />
					</Route>

					<Route exact path="/users/update/:id">
						<UpdateUser />
					</Route>
				</Switch>
			</Router>
		</Container>
	);
};

export default App;
