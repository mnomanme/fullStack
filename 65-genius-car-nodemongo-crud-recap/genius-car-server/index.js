const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

app.get('/', (req, res) => {
	console.log('Car world in connected');
	res.send('Hello Car World!');
});

app.listen(port);
