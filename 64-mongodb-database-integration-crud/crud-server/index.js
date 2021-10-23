const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 2000;

// const username = `userdb01`;
// const password = `YXTHAztnnpvyzR53`;
// const databasename = db1users;

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
			res.send('hit the post');
		});

		// create a document to insert

		// const doc = {
		// 	title: 'Learning MongoDB',
		// 	content: 'No bytes, no problem. Just insert a document, in MongoDB',
		// };

		// const result = await usersCollection.insertOne(doc);

		// console.log(`A document was inserted with the _id: ${result.insertedId}`);
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

// client.connect((err) => {
// 	const usersCollection = client.db('db1users').collection('users');
// 	console.log('users database connected');

// 	const user = { name: 'Mohammad Faruque', email: 'faruque@gmail.com', age: 20, phone: '017999999' };

// 	usersCollection.insertOne(user).then(() => {
// 		console.log('user insert success');
// 	});
// });

app.get('/', (req, res) => {
	res.send('Hello Running my CRUD Server ');
});

app.listen(port, () => {
	console.log('Running Server on my PORT');
});
