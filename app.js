const express = require('express');
const bodyParser = require('body-parser');

const db = require('./config/database')
const userRoutes = require('./routes/user');

db.connect((error) => {
	if(error) {
		console.log(error)
	} else {
		console.log('Mysql connected');
	}
})

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;