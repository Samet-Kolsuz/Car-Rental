import type { Car } from "../types";

type ReturnType = [string, string | number | null][];

export default function formatData(car: Car): ReturnType {
  const accepted = [
    "year",
    "make",
    "model",
    "cylinders",
    "drive",
    "fueltype",
    "trany",
    "vclass",
    "startstop",
    "co2",
    "displ",
    "atvtype",
  ];

  const arr = Object.entries(car).filter(([key]) => accepted.includes(key));
  return arr ;
}