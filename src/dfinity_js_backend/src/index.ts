
import { Actor, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";

// car type
interface Car {
  id: string;
  model: string;
  owner: string;
  available: boolean;
}

// In-memory storage for testing
const cars: Car[] = [
  { id: "1", model: "Tesla Model 3", owner: "Alice", available: true },
  { id: "2", model: "BMW i3", owner: "Bob", available: false },
];

// Example functions to interact with the car data
export const getAvailableCars = async (): Promise<Car[]> => {
  return cars.filter(car => car.available);
};

export const getCarDetails = async (id: string): Promise<Car | undefined> => {
  return cars.find(car => car.id === id);
};

export const bookCar = async (id: string): Promise<boolean> => {
  const car = cars.find(car => car.id === id);
  if (car && car.available) {
    car.available = false;
    return true;
  }
  return false;
};

//used for  Exported Candid interface
export const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  return IDL.Service({
    getAvailableCars: IDL.Func([], [IDL.Vec(IDL.Record({ id: IDL.Text, model: IDL.Text, owner: IDL.Text, available: IDL.Bool }))], ['query']),
    getCarDetails: IDL.Func([IDL.Text], [IDL.Opt(IDL.Record({ id: IDL.Text, model: IDL.Text, owner: IDL.Text, available: IDL.Bool }))], ['query']),
    bookCar: IDL.Func([IDL.Text], [IDL.Bool], []),
  });
};
