const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const path = require('path');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'db123',
        database: 'login'
    }
});

const initialPath = path.join(__dirname, '.');

const app = express();
app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, 'register.html'));
});

app.post('/register-user', (req, res) => {
    const {name, email, password} = req.body;
    if (name === '' || name === undefined || name === null || name.length === 0||
        email === '' || email === undefined || email === null || email.length === 0 ||
        password === '' || password === undefined || password === null || password.length === 0) {
            res.json('Fill all the fields correctly');
    }
    
    if (!(email.includes('@') && email.includes('.'))) {
        res.json('Fill email address correctly');
    }

    // store in db
    db("users").insert({
        name: name,
        email: email,
        password: password
    }).returning(["name", "email"]).then(data => {
        console.log(data);
        res.json(data[0]); // data = [ { name: 'muchi', email: 'muchiko@gmail.com' } ]
    }).catch(err => {
        if (err.detail.includes('already exists')) {
            res.json('Registered user already exists');
        }
        console.log(err)});
});

app.post('/login-user', (req, res) => {
    const {email, password} = req.body;
    if (email === '' || email === undefined || email === null || email.length === 0 ||
        password === '' || password === undefined || password === null || password.length === 0) {
            res.json('Fill all the fields correctly');
    }
    
    if (!(email.includes('@') && email.includes('.'))) {
        res.json('Fill email address correctly');
    }

    // collect from db
    db.select('name', 'email').from('users').where({
        email: email,
        password: password
    }).then(data => {
        if (data.length == 0) {
            res.json('User Not Found');
        } else {
            res.json('Login successful');
        }
    }).catch(err => {
        res.json(err);
    });
});

app.listen(5000, (req, res) => {
    console.log('Server is running on port 5000 ....');
});


