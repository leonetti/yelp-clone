import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const Reviews = React.memo(({ reviews }) => (
  <div className="row row-cols-3 mb-2">
    {reviews &&
      reviews.map((review) => (
        <div key={review.id} className="col-4 mb-4">
          <div className="bg-primary card text-white">
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <StarRating rating={review.rating} />
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        </div>
      ))}
  </div>
));

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string.isRequired,
    }),
  ),
};

Reviews.defaultProps = {
  reviews: [],
};

export default Reviews;
