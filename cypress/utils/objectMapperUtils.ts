import { JsonClassType, ObjectMapper } from "jackson-js";
import { Booking } from "../support/models/bookingModel";

export function Parse<T>(json: any): T | null {
  const parsedObject: T = new ObjectMapper().parse<T>(JSON.stringify(json), { mainCreator: () => [Booking] })
  return parsedObject;
} 