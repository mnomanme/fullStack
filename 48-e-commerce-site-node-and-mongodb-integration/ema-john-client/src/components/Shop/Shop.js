import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../resources/utilities/databaseManager';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Shop = () => {
	return (
		<Container>
			<ShopData></ShopData>
		</Container>
	);
};

// get shop data from fakedata
const ShopData = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	// get data from database
	useEffect(() => {
		fetch(`http://localhost:5000/products`)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	// load produdct data
	useEffect(() => {
		const saveCart = getDatabaseCart();
		const productKeys = Object.keys(saveCart);

		const fetchData = async () => {
			const res = await fetch('http://localhost:5000/productsByKeys', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(productKeys),
			});
			const data = await res.json();
			setCart(data);
		};
		fetchData();
	}, []);

	// add product handle
	const handleAddProduct = (pd) => {
		// console.log('add product', pd);
		const productToAdded = pd.key;
		const sameItemProducts = cart.find((item) => item.key === productToAdded);

		let count = 1;
		let newCart;

		if (sameItemProducts) {
			count = sameItemProducts.quantity + 1;
			sameItemProducts.quantity = count;
			const others = cart.filter((pd) => pd.key !== productToAdded);
			newCart = [...others, sameItemProducts];
		} else {
			pd.quantity = 1;
			newCart = [...cart, pd];
		}
		setCart(newCart);
		addToDatabaseCart(pd.key, count);
	};

	return (
		<section className="shopContainer">
			<section className="productContainer">
				<h3>Total Product: {products.length}</h3>
				{products.map((pd) => {
					const { key } = pd;
					return (
						<Fragment key={key}>
							<Product product={pd} handleAddProduct={handleAddProduct} showAddToCart={true} />;
						</Fragment>
					);
				})}
			</section>

			<section className="cartContainer">
				<Cart cart={cart}>
					<Link to="/review">
						<Button variant="outline-info" size="md">
							Review your Order
						</Button>
					</Link>
				</Cart>
			</section>
		</section>
	);
};

export default Shop;
