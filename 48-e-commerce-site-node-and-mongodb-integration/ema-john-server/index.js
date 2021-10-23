const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port = 5000;

// console.log(process.env.DB_USER);

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p1z0k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
	const productsCollection = client.db('emaShopStore').collection('products');
	const ordersCollection = client.db('emaShopStore').collection('orders');
	console.log('emaStore Database Connected');

	// POST
	app.post('/addProducts', (req, res) => {
		const products = req.body;
		productsCollection.insertOne(products).then((result) => {
			res.send(result.insertedId);
		});
	});

	// GET
	app.get('/products', (req, res) => {
		productsCollection
			.find({})
			.limit(30)
			.toArray((err, documents) => {
				res.send(documents);
			});
	});

	app.get('/products/:key', (req, res) => {
		productsCollection
			.find({ key: req.params.key })
			.limit(30)
			.toArray((err, documents) => {
				res.send(documents[0]);
			});
	});

	// POST
	app.post('/productsByKeys', (req, res) => {
		const productKeys = req.body;
		productsCollection.find({ key: { $in: productKeys } }).toArray((err, documents) => {
			res.send(documents);
		});
	});

	// order
	app.post('/addOrders', (req, res) => {
		const orders = req.body;
		ordersCollection.insertOne(orders).then((result) => {
			res.send(result.insertedCount > 0);
		});
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(process.env.PORT || port);
