import type { Aufgabe, Task } from "types";

const validCategories = ["Marketing", "Development", "Design", "Fulfillment"] as const;
const validSubcategories = [
  "SEO",
  "Google Ads",
  "Social Media",
  "PDF Programmierung",
  "Webformula",
  "Backend",
  "UX/UI",
] as const;

const ConvertTaskToAufgabe = (task: Task): Aufgabe => {
  const category: Aufgabe["category"] =
    validCategories.includes(task.category as any)
      ? (task.category as Aufgabe["category"])
      : undefined;

  const subcategory: Aufgabe["subcategory"] =
    validSubcategories.includes(task.subcategory as any)
      ? (task.subcategory as Aufgabe["subcategory"])
      : undefined;

  const status: Aufgabe["status"] =
    task.status === "in Bearbeitung" ? "Bearbeitung" : task.status;

  return {
    ...task,
     id: typeof task.id === "string" ? Number(task.id) : task.id,
    category,
    subcategory,
    status,
    firma: task.firma ?? "",
  };
};

export default ConvertTaskToAufgabe;
