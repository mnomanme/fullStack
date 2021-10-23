import React from 'react';
import Banner from '../Banner/Banner';
import Experts from '../Experts/Experts';
import Services from '../Services/Services';

const Home = () => {
	return (
		<section id="home">
			<Banner></Banner>
			<Services></Services>
			<Experts></Experts>
		</section>
	);
};

export default Home;
