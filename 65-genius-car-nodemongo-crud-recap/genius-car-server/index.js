const express = require('express');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const cors = require('cors');

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

		//	POST API
		app.get('/services', async (req, res) => {
			// create a document to insert
			const service = {
				name: 'ENGINE DIAGNOSTIC',
				price: '300',
				description: 'Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.',
				img: 'https://i.ibb.co/dGDkr4v/1.jpg',
			};

			const result = await servicesCollection.insertOne(service);
			console.log(`A document was inserted with the _id: ${result.insertedId}`, result);
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
