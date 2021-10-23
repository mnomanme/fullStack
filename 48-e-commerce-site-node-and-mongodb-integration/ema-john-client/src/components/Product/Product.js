import React from 'react';
import './Product.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
	// console.log(props);
	const { name, seller, stock, img, price, key } = props.product;
	const { handleAddProduct, product, showAddToCart } = props;

	return (
		<section className="product">
			<div className="itemsPhoto">
				<img src={img} alt="" />
			</div>

			<div className="productItem">
				<h6 className="productName">
					<Link to={`/product/` + key}>{name}</Link>
				</h6>
				<p>
					<small>by: {seller}</small>
				</p>
				<h6>${price}</h6>
				<p>
					<small>Only {stock} left in stock - Order Soon</small>
				</p>
				{showAddToCart && (
					<Button onClick={() => handleAddProduct(product)} variant="outline-info" size="md-lg">
						<FontAwesomeIcon icon={faShoppingCart} /> add to cart
					</Button>
				)}
			</div>
		</section>
	);
};

export default Product;
