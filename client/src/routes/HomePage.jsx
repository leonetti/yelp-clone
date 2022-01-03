import React from 'react';
import AddRestaurant from '../components/AddRestaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';

function HomePage() {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
}

export default HomePage;
