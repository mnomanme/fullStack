import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getDatabaseCart, removeFromDatabaseCart } from '../../resources/utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../resources/images/giphy.gif';

const Review = () => {
	const [reviewCart, setReviewCart] = useState([]);

	const [orderPlaced, setOrderPlaced] = useState(false);

	const history = useHistory();

	// place order button handle
	const handleProceedCheckout = () => {
		history.push('/shipment');
	};

	// remove product review item
	const handleRemoveProduct = (productKey) => {
		// console.log('review removed', productKey);
		const newCart = reviewCart.filter((pd) => {
			return pd.key !== productKey;
		});
		setReviewCart(newCart);
		removeFromDatabaseCart(productKey);
	};

	useEffect(() => {
		// cart
		const storeCart = getDatabaseCart();
		const productKeys = Object.keys(storeCart);

		const fetchData = async () => {
			const res = await fetch('http://localhost:5000/productsByKeys', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(productKeys),
			});
			const data = await res.json();
			setReviewCart(data);
			console.log(data);
		};
		fetchData();
	}, []);

	// customer placeorder done happy image
	let customerServiceDone;

	if (orderPlaced) {
		customerServiceDone = <img src={happyImage} alt="Order is being Placed" />;
	}

	return (
		<Container className="d-flex">
			<section className="productContainer">
				<h2>Order Items: {reviewCart.length}</h2>
				{reviewCart.map((pd) => {
					const { key } = pd;
					return <ReviewItems key={key} reviewProduct={pd} handleRemoveProduct={handleRemoveProduct} />;
				})}
				{/* order placed done */}
				{customerServiceDone}
			</section>
			<section className="cartContainer">
				<Cart cart={reviewCart}>
					<Link to="/shipment">
						<Button onClick={handleProceedCheckout} variant="outline-info" size="md">
							Proceed Checkout
						</Button>
					</Link>
				</Cart>
			</section>
		</Container>
	);
};

export default Review;
