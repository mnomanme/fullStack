import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
	const { productKey } = useParams();

	const [product, setProduct] = useState({});

	useEffect(() => {
		fetch(`https://store-ema-john.herokuapp.com/products/` + productKey)
			.then((res) => res.json())
			.then((data) => setProduct(data));
	}, [productKey]);

	return (
		<Container>
			<h2>Your Product Details</h2>
			<Product showAddToCart={false} product={product} />
		</Container>
	);
};

export default ProductDetails;
