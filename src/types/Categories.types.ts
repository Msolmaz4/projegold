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
  id: number | string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string | number;
  name: string;
}
