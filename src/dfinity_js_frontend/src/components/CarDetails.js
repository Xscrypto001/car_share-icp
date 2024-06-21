import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetails, bookCar } from '../services/icp';
import '../styles/CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    async function fetchCarDetails() {
      if (id) {
        const carDetails = await getCarDetails(id);
        setCar(carDetails);
      }
    }
    fetchCarDetails();
  }, [id]);

  const handleBook = async () => {
    if (id) {
      const success = await bookCar(id);
      if (success) {
        setCar({ ...car, available: false });
      }
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="car-details">
      <h1>{car.model}</h1>
      <p>Owner: {car.owner}</p>
      <p>Status: {car.available ? 'Available' : 'Booked'}</p>
      {car.available && <button onClick={handleBook}>Book</button>}
    </div>
  );
};

export default CarDetails;
