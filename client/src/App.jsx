import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import RestaurantUpdatePage from './routes/RestaurantUpdatePage';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/restaurants/:id/update"
            element={<RestaurantUpdatePage />}
          />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
