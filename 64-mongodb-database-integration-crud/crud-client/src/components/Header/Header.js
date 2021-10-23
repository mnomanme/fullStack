import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => {
	return (
		<Nav className="justify-content-center">
			<Nav.Item>
				<NavLink to="/" className="Link">
					Home
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="/users" className="Link">
					User
				</NavLink>
			</Nav.Item>
			<Nav.Item>
				<NavLink to="users/add" className="Link">
					Add User
				</NavLink>
			</Nav.Item>
		</Nav>
	);
};
