import React, { useEffect, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

function RestaurantList() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(async () => {
    try {
      const response = await RestaurantFinder.get('/');
      setRestaurants(response.data.data.restaurants);
      console.log(restaurants);
    } catch (error) {
      // TO DO
      console.log(error);
    }
  }, []);

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
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>Reviews</td>
                <td>
                  <button type="button" className="btn btn-warning">
                    Update
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
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
