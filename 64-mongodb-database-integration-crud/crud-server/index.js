const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// middleware

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://userdb01:YXTHAztnnpvyzR53@projectscluster0.xzxby.mongodb.net/db1users?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
	try {
		await client.connect();
		const database = client.db('db1users');
		const usersCollection = database.collection('users');

		console.log('users database connected');

		// POST API
		app.post('/users', async (req, res) => {
			console.log('Post is hitting', req.body);
			const newUser = req.body;
			const result = await usersCollection.insertOne(newUser);
			console.log('Get new user', req.body);
			console.log('Add new user', result);
			res.json(result);
		});
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Hello Running my CRUD Server ');
});

app.listen(port, () => {
	console.log('Running Server on my PORT');
});

// const username = `userdb01`;
// const password = `YXTHAztnnpvyzR53`;
// const databasename = db1users;
