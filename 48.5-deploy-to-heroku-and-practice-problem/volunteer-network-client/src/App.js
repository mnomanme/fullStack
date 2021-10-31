import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { AddEvents } from './components/AddEvents/AddEvents';

function App() {
	return (
		<div className="App">
			<h3>Volunteer Network</h3>
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/addEvents">Add Events</Link>
							</li>
							<li>
								<Link to="/dashboard">Dashboard</Link>
							</li>
						</ul>
					</nav>

					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/addEvents">
							<AddEvents />
						</Route>

						<Route path="/dashboard">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
