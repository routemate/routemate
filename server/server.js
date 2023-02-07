const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const request = require('request');
const cors = require('cors');

const PORT = 3000;
const app = express();

const loginRouter = require('./routes/login.js');

const orderController = require('./controllers/orderController');
const userController = require('./controllers/userController');

const mongoURI =
  process.env.mongoURI ||
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2';
mongoose.connect(mongoURI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: '*',
    headers: '*',
    credentials: true,
  })
);

// ADD ROUTES HERE
app.use('/login', loginRouter);

// provides client with array of orders from db
app.get('/orders', orderController.getOrders, (req, res) => {
  return res
    .status(200)
    .json({ orders: res.locals.orders, name: res.locals.name });
});

app.get('/', (req, res) => {
  res.redirect('http://localhost:8080/');
});

app.post('/orders', orderController.updateOrders, (req, res) => {
  return res.status(201);
});

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
