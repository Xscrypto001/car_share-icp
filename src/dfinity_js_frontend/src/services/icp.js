import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl } from "../declarations/backend";

const agent = new HttpAgent({ host: "http://localhost:8000" });

const backend = Actor.createActor(backend_idl, {
  agent,
  canisterId: process.env.BACKEND_CANISTER_ID,
});

export const getAvailableCars = async () => {
  return backend.getAvailableCars();
};

export const getCarDetails = async (id) => {
  return backend.getCarDetails(id);
};

export const bookCar = async (id) => {
  return backend.bookCar(id);
};
