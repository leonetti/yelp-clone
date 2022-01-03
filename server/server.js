// dotenv allows us to parse environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // Middleware to configure CORS requests (since server/client are on diff ports)
const morgan = require('morgan'); // HTTP request that simplifies logs
const db = require('./db'); // Postgres Database

const app = express();

// BUILT IN EXPRESS MIDDLEWARE
// takes information in body of our request and attatches it to the request object under req.body
app.use(express.json());

// THIRD PARTY MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));

// CUSTOM MIDDLEWARE

// GET ALL restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const restaurantRatings = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id',
    );

    res.status(200).json({
      status: 'success',
      results: restaurantRatings.rows.length,
      data: {
        restaurants: restaurantRatings.rows,
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
    // Get restaurant
    const restaurant = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
      [req.params.id],
    );

    // Get reviews for restaurant
    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [req.params.id],
    );

    res.status(200).json({
      status: 'success',
      data: {
        reviews: reviews.rows,
        restaurant: restaurant.rows[0],
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
app.delete('/api/v1/restaurants/:id', (req, res) => {
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

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  try {
    const newReview = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *',
      [req.params.id, req.body.name, req.body.review, req.body.rating],
    );
    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0],
      },
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
