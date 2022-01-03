import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from './StarRating';

function RestaurantList() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      const response = await RestaurantFinder.get('/');
      setRestaurants(response.data.data.restaurants);
    } catch (error) {
      // TO DO
      console.log(error);
    }
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Stops so event doesn't bubble up to the Row

    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      console.log(response);
    } catch (error) {
      // TO DO
      console.log(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation(); // Stops so event doesn't bubble up to the Row

    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return (
        <span className="text-warning">
          0 Reviews
        </span>
      );
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ms-2">
          {`(${restaurant.count})`}
        </span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr
                onClick={() => handleRestaurantSelect(restaurant.id)}
                key={restaurant.id}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    type="button"
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
