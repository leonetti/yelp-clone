// dotenv allows us to parse environment variables
require('dotenv').config();

const express = require('express');
const morgan = require('morgan'); // HTTP request that simplifies logs
const db = require('./db'); // Postgres Database

const app = express();

// BUILT IN EXPRESS MIDDLEWARE
// takes information in body of our request and attatches it to the request object under req.body
app.use(express.json());

// THIRD PARTY MIDDLEWARE
app.use(morgan('dev'));

// CUSTOM MIDDLEWARE

// GET ALL restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM restaurants',
    );

    res.status(200).json({
      status: 'success',
      length: results.rows.length || 0,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    // TO DO
    console.log(error);
  }
});

// GET ONE restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [req.params.id],
    );

    res.status(200).json({
      status: 'success',
      length: results.rows.length || 0,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    // TO DO
    console.log(error);
  }
});

// CREATE ONE restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range],
    );

    res.status(201).json({
      status: 'success',
      length: results.rows.length || 0,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    // TO DO
    console.log(error);
  }
});

// UPDATE ONE restaurant
app.put('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query(
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id],
    );

    res.status(200).json({
      status: 'success',
      length: results.rows.length || 0,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    // TO DO
    console.log(error);
  }
});

// DELETE ONE restaurant
app.delete('/api/v1/restaraunts/:id', (req, res) => {
  try {
    db.query(
      'DELETE FROM restaurants WHERE id = $1',
      [req.params.id],
    );

    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    // TO DO
    console.log(error);
  }
});

// binds and listens for connections on the specified host and port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is up and listening on port ${port}`);
});
