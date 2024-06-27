import React from 'react';
import { Link } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import '../styles/CarCard.css';

const CarCard = ({ car }) => {
  return (
    <div className={`car-card ${car.available ? 'available' : 'not-available'}`}>
      <h2>{car.model}</h2>
      <p><strong>Owner:</strong> {Principal.fromText(car.owner).toText()}</p>
      <p><strong>Status:</strong> {car.available ? 'Available' : 'Not Available'}</p>
      <Link to={`/car/${car.id}`} className="details-link">View Details</Link>
    </div>
  );
};

export default CarCard;
