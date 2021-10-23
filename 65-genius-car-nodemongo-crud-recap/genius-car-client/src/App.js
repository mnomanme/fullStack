import Home from './Pages/Home/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound/NotFound';
import Booking from './Pages/Booking/Booking/Booking';
import Login from './Pages/Login/Login/Login';
import Header from './Pages/Shared/Header/Header';
import AuthProvider from './contexts/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import { AddService } from './Pages/AddService/AddService';

const App = () => {
	return (
		<section className="text-center">
			<AuthProvider>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/home">
							<Home />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<PrivateRoute path="/booking/:serviceId">
							<Booking />
						</PrivateRoute>
						<Route path="/addservice">
							<AddService />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</AuthProvider>
		</section>
	);
};

export default App;
