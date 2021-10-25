const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projectscluster0.xzxby.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
	try {
		await client.connect();
		console.log('Genius Car database connected ');
		const database = client.db('db2users');
		const servicesCollection = database.collection('carmaterials');

		// GET API
		app.get('/services', async (req, res) => {
			const cursor = servicesCollection.find({});
			const services = await cursor.toArray();
			res.send(services);
		});

		// GET SINGLE SERVICE
		app.get('/services/:id', async (req, res) => {
			const id = req.params.id;
			console.log('Getting a single service', id);
			const ObjectId = require('mongodb').ObjectId;
			const query = { _id: ObjectId(id) };
			const service = await servicesCollection.findOne(query);

			res.json(service);
		});
		//	POST API
		app.post('/services', async (req, res) => {
			const service = req.body;

			console.log('Hit the API', service);

			const result = await servicesCollection.insertOne(service);

			console.log(`A document was inserted with the _id: ${result.insertedId}`, result);

			res.json(result);
		});

		// DELETE API
		app.delete('/services/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await servicesCollection.deleteOne(query);

			res.json(result);
		});
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	console.log('Car world in connected');
	res.send('Hello Car World!');
});

app.listen(port, () => {
	console.log('Running Genius Server on PORT', port);
});
