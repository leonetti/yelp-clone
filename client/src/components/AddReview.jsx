import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import RestaurantFinder from '../apis/RestaurantFinder';

function AddReview({ setNewReviews }) {
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('Rating');
  const { id } = useParams();
  const focusInput = useRef();

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      setNewReviews(true);
      setName('');
      setReviewText('');
      setRating('Rating');
      focusInput.current.focus();
    } catch (error) {
      // TO DO
      console.log(error);
    }
  };

  return (
    <form action="" onSubmit={handleSubmitReview}>
      <div className="form-row">
        <label htmlFor="name" className="form-group col-8">
          Name
          <input
            value={name}
            ref={focusInput}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="name"
            type="text"
            className="form-control"
          />
        </label>
        <label htmlFor="rating" className="form-group col-4">
          Rating
          <select
            id="rating"
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <div className="form-row">
          <label htmlFor="review" className="form-group col-12 mt-4">
            Review
            <textarea
              id="review"
              className="form-control"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </label>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg my-2 px-5">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

AddReview.propTypes = {
  setNewReviews: PropTypes.func.isRequired,
};

export default AddReview;
