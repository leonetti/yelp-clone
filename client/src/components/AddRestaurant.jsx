import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

function AddRestaurant() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');
  const { addRestaurant } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent form from reloading the page
    try {
      const response = await RestaurantFinder.post('/', {
        name,
        location,
        price_range: priceRange,
      });

      addRestaurant(response.data.data.restaurant);
    } catch (error) {
      // TO DO
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="form-select"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg my-2 px-5">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddRestaurant;
