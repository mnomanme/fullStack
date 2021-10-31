const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

app.use(cors);
app.use(express.json());

const port = process.env.PORT || 45000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@volunteer.lrgaq.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
	res.send('Hello World!');
});

client.connect((err) => {
	console.log('connection error:', err);
	const eventsCollection = client.db('volunteer').collection('events');
	console.log('Volunteer Database Connected Successfully!');
});

app.listen(port, () => {
	console.log(`Volunteer Port Running Now:${port}`);
});
