import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetails, bookCar } from '../services/icp';
import '../styles/CarDetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        if (id) {
          const carDetails = await getCarDetails(id);
          setCar(carDetails);
        }
      } catch (err) {
        setError('Failed to fetch car details.');
      } finally {
        setLoading(false);
      }
    }
    fetchCarDetails();
  }, [id]);

  const handleBook = async () => {
    try {
      if (id) {
        const success = await bookCar(id);
        if (success) {
          setCar({ ...car, available: false });
        }
      }
    } catch (err) {
      setError('Failed to book the car.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div>No car details found.</div>;

  return (
    <div className="car-details">
      <h1>{car.model}</h1>
      <p><strong>Owner:</strong> {car.owner}</p>
      <p><strong>Status:</strong> {car.available ? 'Available' : 'Booked'}</p>
      {car.available && <button onClick={handleBook} className="book-button">Book</button>}
    </div>
  );
};

export default CarDetails;
