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
		const haiku = database.collection('carmaterials');
		// create a document to insert
		const doc = {
			title: 'Record of a Shriveled Datum',
			content: 'No bytes, no problem. Just insert a document, in MongoDB',
		};
		const result = await haiku.insertOne(doc);
		console.log(`A document was inserted with the _id: ${result.insertedId}`);
	} finally {
		await client.close();
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
