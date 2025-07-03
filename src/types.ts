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
export interface Aufgabe {
  vorarbeit?: number | undefined;
  umsetzung?: number | undefined;
  kontrolle?: number | undefined;
  kosten?: number | undefined;
  status?: "offen" | "Bearbeitung" | "erledigt" | "geplant" | undefined;
  dueDate?: string | undefined;
  category?: "Marketing" | "Development" | "Design" | "Fulfillment" | undefined;
  subcategory?:
  | "Google Ads"
  | "Social Media"
  | "SEO"
  | "PDF Programmierung"
  | "Webformula"
  | 'Backend'
  | 'UX/UI'
  | undefined;
  name: string;
  firma: string,
  fallig?: string;
  meilenstein?: string;

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
  imageURL?: string | undefined;
  tasks?: Task[];
  aufgabe?: Aufgabe[];
  imageFile?: Blob | MediaSource | null;
  image?: Blob | MediaSource;
  milestoneDate?: string,
}

export interface Task {
  id: number | string;
  category?: KategorieListe | string | undefined | '';
  subcategory?: string | Subkategorie | "";
  name: string;
  vorarbeit?: number;
  umsetzung?: number;
  kontrolle?: number;
  kosten?: number;
  status?: "offen" | "in Bearbeitung" | "erledigt" | "geplant";
  milestone?: string;
  email?: string;
  dueDate?: string;
  firma?: string;
  tasks?: string[] | undefined;
  milestoneDate?: string | undefined;
  milestones: {
    title?: string;
    date?: string;
    fallig?: string;
    meilenstein?: string;


  }[];
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



export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
};

export interface Subcategory {
  id: string;
  name: string;
};
// -----------------------EDITUSERMODAL:TSX----------------------