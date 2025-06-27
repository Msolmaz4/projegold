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

export interface Company {
  name: string;
  catchPhrase: string;
  description?: string;
  bs: string;
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
  logoUrl?: string;
  image?: File | undefined;
  description?: string;
}


export interface Task {
  id: number;
  category: KategorieListe | "" |string;
  subcategory: string| Subkategorie | "";
  name?: string;
  vorarbeit: number;
  umsetzung: number;
  kontrolle: number;
  kosten: number;
  status: "offen" | "in Bearbeitung" | "erledigt" | "geplant";
  milestone?: string;
  dueDate?: string;
  firma?: string;
  tasks?: string[] | undefined;
  milestones?: string[];
};

export type KategorieListe =
  | "Marketing"
  | "Vertrieb"
  | "Produktion"
  | "Finanzierung"
  | "Technik"
  | "Geschäftsführung"
  | "IT"
  | "Logistik"
  | "Führung"
  | "Kunden";

export type Subkategorie =
  | "SEO"
  | "Social Media Ads"
  | "Cold Calls"
  | "Cold Mails"
  | "Car"
  | "Home"
  | "Work"
  | "School"
  | "Other";



export interface Category  {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

export interface Subcategory  {
  id: string;
  name: string;
};
