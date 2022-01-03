import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

function RestaurantDetailPage() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const [newReviews, setNewReviews] = useState(true);

  useEffect(async () => {
    // newReviews forces re-render of page
    // recalculating review avg, num of reviews, and adds review
    if (newReviews) {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        const restaurant = response.data.data;

        setNewReviews(false);
        setSelectedRestaurant(restaurant);
      } catch (err) {
        // TO DO
        console.log(err);
      }
    }
  }, [newReviews]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1 text-capitalize">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ms-1">
              {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
            <AddReview setNewReviews={setNewReviews} />
          </div>
        </>
      )}
    </div>
  );
}

export default RestaurantDetailPage;
