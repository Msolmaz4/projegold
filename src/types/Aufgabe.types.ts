export interface Aufgabe {
  vorarbeit?: number | undefined;
  umsetzung?: number | undefined;
  kontrolle?: number | undefined;
  kosten?: number | undefined;
  status?: "offen" | "Bearbeitung" | "erledigt" | "geplant" | undefined;
  dueDate?: string | undefined;
  category: "Marketing" | "Development" | "Design" | "Fulfillment" | undefined;
  subcategory?:
    | "Google Ads"
    | "Social Media"
    | "SEO"
    | "PDF Programmierung"
    | "Webformula"
    | "Backend"
    | "UX/UI"
    | undefined;
  name: string;
  firma: string;
  fallig?: string;
  meilenstein?: string;
  id?: number;
}
