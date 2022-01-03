import React from 'react';
import PropTypes from 'prop-types';

function StarRating({ rating }) {
  const stars = [];
  const opts = {};
  if (rating) {
    opts.title = `${rating} Stars`;
  }

  for (let i = 1; i <= 5; i += 1) {
    if (i <= rating) {
      // full star
      stars.push(<i key={i} className="fas fa-star text-warning" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // half star
      stars.push(<i key={i} className="fas fa-star-half-alt text-warning" />);
    } else {
      // empty star
      stars.push(<i key={i} className="far fa-star text-warning " />);
    }
  }

  return <span title={rating ? `${rating} Stars` : 'No Rating'}>{stars}</span>;
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
