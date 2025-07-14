import type { KategorieListe, Subkategorie } from "./Categories.types";
export interface Milestone {
  title?: string;
  date?: string;
  fallig?: string;
  meilenstein?: string;
}
export interface Task {
  id: number | string;
  category?: KategorieListe | string | "Unbekannte Kategorie";
  subcategory?: string | Subkategorie | "" | number;
  categoryId?: string | number;
  subcategoryId?: string | number;
  name: string;
  vorarbeit?: number;
  umsetzung?: number;
  kontrolle?: number;
  kosten?: number;
  status?: "offen" | "in Bearbeitung" | "erledigt" | "geplant" | undefined;
  milestone?: string;
  email?: string;
  dueDate?: string;
  firma?: string;
  tasks?: string[] | undefined;
  milestoneDate?: string | undefined;
  milestones: Milestone[];
}
