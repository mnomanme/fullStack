import React, { useContext } from 'react';
import './Header.css';
import { Button, Container } from 'react-bootstrap';
import logo from '../../resources/images/logo.png';
import { Link } from 'react-router-dom';
import { userContext } from '../Layouts/Layouts';

const Header = () => {
	const [loggedInUser, setLoggedInUser] = useContext(userContext);
	return (
		<div>
			<Container className="header">
				<img src={logo} alt="" />
				<nav>
					<Link to="/shop">Shop</Link>
					<Link to="/review">Order Review</Link>
					<Link to="/inventory">Manage Inventory</Link>
					<Button onClick={() => setLoggedInUser()} variant="outline-warning " size="lg">
						Sign Out
					</Button>
				</nav>
			</Container>
		</div>
	);
};

export default Header;
