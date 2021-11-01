const express = require('express');
const app = express();
const cors = require('cors');
const ObjectID = require('mongodb').ObjectId;
require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ObjectID } = require('bson');

app.use(cors);
app.use(express.json());

const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@volunteer.lrgaq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
	res.send('Hello World!');
});

client.connect((err) => {
	console.log('connection error:', err);
	const eventsCollection = client.db('volunteer').collection('events');
	console.log('Volunteer Database Connected Successfully!');

	// get

	app.get('/events', (req, res) => {
		eventsCollection.find().toArray((err, items) => {
			console.log('from db', items);
			res.send(items);
		});
	});

	// post
	app.post('/addEvent', (req, res) => {
		const newEvent = req.body;
		console.log('adding new event', newEvent);
		eventsCollection.insertOne(newEvent).then((result) => {
			console.log('inserted count', insertedCount);
			res.send(result.insertedCount > 0);
		});
	});

	app.delete('/deleteEvent/:id', (req, res) => {
		const id = ObjectID(req.params.id);
		console.log('delete this', id);
		eventsCollection.findOneAndDelete({ _id: id }).then((documents) => res.send(documents.value));
	});
});

app.listen(port, () => {
	console.log(`Volunteer Port Running Now:${port}`);
});
