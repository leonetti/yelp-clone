// dotenv allows us to parse environment variables
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();

// built in express middleware
// takes information in body of our request and attatches it to the request object under req.body
app.use(express.json());

// third party middleware
app.use(morgan('dev'));

// custom middleware

// GET all restaurants
app.get('/api/v1/restaurants', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurants: ['mcdonalds', 'wendys'],
    },
  });
});

// GET a restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'mcdonalds',
    },
  });
});

// CREATE a restaurant
app.post('/api/v1/restaurants', (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      restaurant: 'mcdonalds',
    },
  });
});

// UPDATE a restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      restaurant: 'mcdonalds',
    },
  });
});

// DELETE a restaurant
app.delete('/api/v1/restaraunts/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
  });
});

// binds and listens for connections on the specified host and port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is up and listening on port ${port}`);
});
