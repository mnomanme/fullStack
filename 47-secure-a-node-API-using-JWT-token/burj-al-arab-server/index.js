const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

console.log(process.env.DB_USER);

const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require('./configs/burj-arab-auth-firebase-adminsdk-jw4er-aac000f86a.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.FIRE_DB,
});

const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbgpa.mongodb.net/BurjAlArabBooking?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongodb database connect
client.connect((err) => {
	const bookingsCollection = client.db('BurjAlArabBooking').collection('bookings');
	console.log('burjAlArab database');

	// post
	app.post('/addBooking', (req, res) => {
		const newBooking = req.body;
		bookingsCollection.insertOne(newBooking).then((result) => {
			res.send(result.insertedId > 0);
			console.log(result);
		});
		console.log(newBooking);
	});

	// get
	app.get('/bookings', (req, res) => {
		const bearer = req.headers.authorization;

		if (bearer && bearer.startsWith('Bearer ')) {
			const idToken = bearer.split(' ')[1];
			console.log({ idToken });

			// idToken comes from the client app
			admin
				.auth()
				.verifyIdToken(idToken)
				.then((decodedToken) => {
					const tokenEmail = decodedToken.email;
					const queryEmail = req.query.email;
					console.log(tokenEmail === queryEmail);
					console.log(tokenEmail, queryEmail);
					if (tokenEmail === queryEmail) {
						bookingsCollection.find({ email: queryEmail }).toArray((err, documents) => {
							res.status(200).send(documents);
						});
					} else {
						res.status(401).send('unauthorized access');
					}
				})
				.catch((error) => {
					console.log(error);
					res.status(401).send('unauthorized access');
				});
		} else {
			res.status(401).send('unauthorized access');
		}
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`My Port is Listening http://localhost:${port}`);
});

// const passwod = `KjGFLr4cuROEToJN`;
// const dataBaseName = `BurjAlArabBooking`;
