import type { Task } from "./Task.types";
import type { Company } from "./Company.types";
import type { Aufgabe } from "../types";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  description?: string;
  imageURL: string;
  tasks?: Task[];
  aufgabe?: Aufgabe[];
  imageFile?: Blob | MediaSource | null;
  image?: Blob | MediaSource;
  milestoneDate?: string;
  admin: boolean;
  password?: string | undefined;
}
