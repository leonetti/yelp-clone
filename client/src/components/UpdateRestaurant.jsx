import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await RestaurantFinder.get(`/${id}`);
    const { restaurant } = response.data.data;
    setName(restaurant.name);
    setLocation(restaurant.location);
    setPriceRange(restaurant.price_range);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form page reload

    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });

    navigate('/');
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="name" className="form-group row">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          className="form-control"
        />
      </label>
      <label htmlFor="location" className="form-group row">
        Location
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          type="text"
          className="form-control"
        />
      </label>
      <label htmlFor="price_range" className="form-group row">
        Price Range
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          id="price_range"
          className="form-select"
        >
          <option disabled>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
        </select>
      </label>
      <div className="text-center">
        <button type="submit" className="btn btn-primary btn-lg my-2 px-5">
          Submit
        </button>
      </div>
    </form>
  );
}

export default UpdateRestaurant;
