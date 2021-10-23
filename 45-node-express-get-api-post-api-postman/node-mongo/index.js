const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = ['Noman', 'Montu', 'Sezan', 'Mehe', 'Zarin', 'Faruque'];

// GET
app.get('/', (req, res) => {
	const products = {
		product: 'mango',
		price: 80,
	};
	res.send(products);
});

app.get('/fruits/orange', (req, res) => {
	const fruits = {
		fruit: 'orange',
		qunatity: 2000,
		price: 22000,
	};

	res.send(fruits);
});

app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	const name = users[id];
	res.send({ id, name });
	console.log(req.query);
	// console.log(req.params.id);
});

// POST
app.post('/addUser', (req, res) => {
	// saved to database
	const user = req.body;
	user.id = 96;
	res.send(user);
	console.log('data recieved', req.body);
});

app.listen('5000', () => console.log('listening port 5000 done!'));
