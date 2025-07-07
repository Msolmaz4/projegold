import type { KategorieListe, Subkategorie } from "./Categories.types";

export interface Task {
  id: number | string;
  category?: KategorieListe | string | undefined | "";
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
}
