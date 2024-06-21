import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <h2>{car.model}</h2>
      <p>Owner: {car.owner}</p>
      <Link to={`/car/${car.id}`}>View Details</Link>
    </div>
  );
};

export default CarCard;
