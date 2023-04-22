const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const path = require('path');

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

app.listen(5000, (req, res) => {
    console.log('Server is running on port 5000 ....');
});


