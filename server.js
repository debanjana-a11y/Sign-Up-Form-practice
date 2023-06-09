const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;

const db = knex({
	client: 'pg',
	connection: {
		host: 'dpg-ci03lsm4dad35tr1en2g-a',
		user: 'postgres1',
		password: 'rbwGWTbDWpU9sPFuJApJPs526Q1Ol1MJ',
		database: 'login',
	},
});

const initialPath = path.join(__dirname, '.');

const app = express();
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req, res) => {
	res.sendFile(path.join(initialPath, 'login.html'));
});

app.get('/home', (req, res) => {
	res.sendFile(path.join(initialPath, 'index.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(initialPath, 'login.html'));
});

app.get('/register', (req, res) => {
	res.sendFile(path.join(initialPath, 'register.html'));
});

app.post('/register-user', (req, res) => {
	const { name, email, password } = req.body;
	if (
		name === '' ||
		name === undefined ||
		name === null ||
		name.length === 0 ||
		email === '' ||
		email === undefined ||
		email === null ||
		email.length === 0 ||
		password === '' ||
		password === undefined ||
		password === null ||
		password.length === 0
	) {
		res.status(400).json({ warning: 'Fill all the fields correctly' });
		return;
	}

	if (!(email.includes('@') && email.includes('.'))) {
		res.status(400).json({ warning: 'Fill email address correctly' });
		return;
	}

	// store in db
	db('users')
		.insert({
			name: name,
			email: email,
			password: password,
		})
		.returning(['name', 'email'])
		.then((data) => {
			res.status(200).json({
				data: data[0],
			}); // data = [ { name: 'muchi', email: 'muchiko@gmail.com' } ]
		})
		.catch((err) => {
			if (
				(err.error !== undefined && err.error.includes('duplicate')) ||
				(err.detail !== undefined && err.detail.includes('already exists'))
			) {
				res.status(409).json({ error: 'Registered user already exists' });
			} else {
				res
					.status(500)
					.json({ error: 'Unknown Error Occured. Please Try Again.' });
			}
		});
});

app.post('/login-user', (req, res) => {
	const { email, password } = req.body;
	if (
		email === '' ||
		email === undefined ||
		email === null ||
		email.length === 0 ||
		password === '' ||
		password === undefined ||
		password === null ||
		password.length === 0
	) {
		res.status(400).json({ warning: 'Fill all the fields correctly' });
		return;
	}

	if (!(email.includes('@') && email.includes('.'))) {
		res.status(400).json({ warning: 'Fill email address correctly' });
		return;
	}

	// collect from db
	db.select('name', 'email')
		.from('users')
		.where({
			email: email,
			password: password,
		})
		.then((data) => {
			if (data.length == 0) {
				res.status(404).json({ error: 'User Not Found' });
			} else {
				res.status(200).json({ retVal: data[0], message: 'Login successful' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

app.listen(port, (req, res) => {
	console.log(`Server is running on port ${port} ....`);
});
