import './ReviewItems.css';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

const ReviewItems = (props) => {
	// console.log(props);
	const { name, img, quantity, key, price } = props.reviewProduct;
	const handleRemoveProduct = props.handleRemoveProduct;

	return (
		<section className="review">
			<div className="itemsPhoto">
				<img src={img} alt="" />
			</div>
			<div className="reviewItem">
				<h6 className="reviewName">{name}</h6>
				<p>Quantity: {quantity}</p>
				<p>
					<small>${price}</small>
				</p>
				<Button onClick={() => handleRemoveProduct(key)} variant="outline-warning" size="md-lg">
					<FontAwesomeIcon icon={faDoorClosed} /> Remove
				</Button>
			</div>
		</section>
	);
};

export default ReviewItems;
