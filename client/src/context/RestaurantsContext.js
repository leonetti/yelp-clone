import React, { useState, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const RestaurantsContext = createContext();

export function RestaurantsContextProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const value = useMemo(() => ({
    restaurants, setRestaurants,
  }), [restaurants]);

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
