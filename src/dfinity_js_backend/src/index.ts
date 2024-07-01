import { Actor, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";

// Car type
interface Car {
  id: string;
  model: string;
  owner: Principal;
  available: boolean;
}

// Role type
type Role = "owner" | "renter";

// User type
interface User {
  principal: Principal;
  role: Role;
}

// Persistent storage for cars
const cars: Car[] = [
  { id: "1", model: "Tesla Model 3", owner: Principal.fromText("aaaaa-aa"), available: true },
  { id: "2", model: "BMW i3", owner: Principal.fromText("bbbbb-bb"), available: false },
];

// Persistent storage for users
const users: User[] = [
  { principal: Principal.fromText("aaaaa-aa"), role: "owner" },
  { principal: Principal.fromText("bbbbb-bb"), role: "renter" },
];

// Get user role
const getUserRole = (principal: Principal): Role | undefined => {
  const user = users.find(user => user.principal.toText() === principal.toText());
  return user ? user.role : undefined;
};

// Hypothetical function to get the current authenticated user
async function getCurrentUser(): Promise<Principal> {
  // This function should be implemented to return the current authenticated user principal
  return Principal.anonymous(); // Placeholder, replace with actual authentication logic
}

// Add a new user
export const addUser = (principal: Principal, role: Role): void => {
  if (users.find(user => user.principal.toText() === principal.toText())) {
    throw new Error("User already exists");
  }
  users.push({ principal, role });
};

// Add a new car
export const addCar = (id: string, model: string, owner: Principal): void => {
  if (cars.find(car => car.id === id)) {
    throw new Error("Car with this ID already exists");
  }
  cars.push({ id, model, owner, available: true });
};

// Get available cars
export const getAvailableCars = async (): Promise<Car[]> => {
  const principal = await getCurrentUser();
  const role = getUserRole(principal);
  if (!role) throw new Error("User not authorized");

  return cars.filter(car => car.available);
};

// Get car details
export const getCarDetails = async (id: string): Promise<Car | undefined> => {
  const principal = await getCurrentUser();
  const role = getUserRole(principal);
  if (!role) throw new Error("User not authorized");

  return cars.find(car => car.id === id);
};

// Book a car
export const bookCar = async (id: string): Promise<boolean> => {
  const principal = await getCurrentUser();
  const role = getUserRole(principal);
  if (!role) throw new Error("User not authorized");

  const car = cars.find(car => car.id === id);
  if (!car) throw new Error("Car not found");
  if (!car.available) throw new Error("Car not available");

  // Additional authorization check if needed
  // Example: if role is "renter", ensure they are not booking their own car
  if (role === "renter" && car.owner.toText() === principal.toText()) {
    throw new Error("Owners cannot book their own cars");
  }

  car.available = false;
  return true;
};

// Return a car
export const returnCar = async (id: string): Promise<boolean> => {
  const principal = await getCurrentUser();
  const role = getUserRole(principal);
  if (!role) throw new Error("User not authorized");

  const car = cars.find(car => car.id === id);
  if (!car) throw new Error("Car not found");
  if (car.available) throw new Error("Car is already available");

  // Additional authorization check if needed
  // Example: if role is "owner", ensure they are not returning a car they do not own
  if (role === "owner" && car.owner.toText() !== principal.toText()) {
    throw new Error("Owners can only return their own cars");
  }

  car.available = true;
  return true;
};

// Exported Candid interface
export const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  return IDL.Service({
    getAvailableCars: IDL.Func([], [IDL.Vec(IDL.Record({ id: IDL.Text, model: IDL.Text, owner: IDL.Principal, available: IDL.Bool }))], ['query']),
    getCarDetails: IDL.Func([IDL.Text], [IDL.Opt(IDL.Record({ id: IDL.Text, model: IDL.Text, owner: IDL.Principal, available: IDL.Bool }))], ['query']),
    bookCar: IDL.Func([IDL.Text], [IDL.Bool], []),
    returnCar: IDL.Func([IDL.Text], [IDL.Bool], []),
    addUser: IDL.Func([IDL.Principal, IDL.Text], [], []),
    addCar: IDL.Func([IDL.Text, IDL.Text, IDL.Principal], [], []),
  });
};
