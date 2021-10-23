const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');

const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;

const uri = 'mongodb+srv://crudUser:8hEfwtCXbgvhvKs@cluster0.06vsz.mongodb.net/cruddb?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
	// res.send('I am working now');
	res.sendFile(__dirname + '/index.html');
});

client.connect((err) => {
	const productCollection = client.db('cruddb').collection('products');

	// get
	app.get('/products', (req, res) => {
		productCollection
			.find({})
			.limit(25)
			.toArray((err, documents) => {
				res.send(documents);
				console.log('data is find');
			});
	});

	// get update
	app.get('/product/:id', (req, res) => {
		productCollection.find({ _id: ObjectId(req.params.id) }).toArray((err, documents) => {
			res.send(documents[0]);
		});
	});

	// update
	app.patch('/update/:id', (req, res) => {
		productCollection
			.updateOne(
				{ _id: ObjectId(req.params.id) },
				{
					$set: { price: req.body.price, quantity: req.body.quantity },
				}
			)
			.then((result) => {
				// console.log(result);
				res.send(result.modifiedCount > 0);
			});
	});

	// post
	app.post('/addProduct', (req, res) => {
		const product = req.body;
		productCollection.insertOne(product).then((result) => {
			res.redirect('/');
			// console.log('add');
			// res.send('success');
		});
		console.log(product);
	});

	// const product = { name: 'honey', price: 750, quantity: 30 };
	// app.post('/addProduct', (req, res) => {
	// 	collection.insertOne(product).then((result) => {
	// 		console.log('product is added');
	// 	});

	// });

	// delete
	app.delete('/delete/:id', (req, res) => {
		console.log(req.params.id);
		productCollection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
			// console.log(result);
			res.send(result.deletedCount > 0);
		});
	});

	console.log('database connected successfully');
});

app.listen('5000');

// username: crudUser
// password: 8hEfwtCXbgvhvKs
