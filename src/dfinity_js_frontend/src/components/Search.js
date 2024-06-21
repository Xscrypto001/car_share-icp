import React, { useState, useEffect } from 'react';
import { getAvailableCars } from '../services/icp';
import CarCard from './CarCard';
import '../styles/Search.css';

const Search = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const availableCars = await getAvailableCars();
      setCars(availableCars);
    }
    fetchCars();
  }, []);

  return (
    <div className="search">
      <h1>Available Cars</h1>
      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Search;
