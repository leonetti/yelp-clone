import React from 'react';

function AddRestaurant() {
  return (
    <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="name" />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select className="form-select">
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-lg my-2 px-5">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddRestaurant;
