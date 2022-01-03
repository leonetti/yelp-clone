import React, { useState, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const RestaurantsContext = createContext();

export function RestaurantsContextProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const value = useMemo(() => ({
    restaurants,
    setRestaurants,
    addRestaurant,
    selectedRestaurant,
    setSelectedRestaurant,
  }), [restaurants, selectedRestaurant]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <RestaurantsContext.Provider value={value}>
      { children }
    </RestaurantsContext.Provider>
  );
}

RestaurantsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
