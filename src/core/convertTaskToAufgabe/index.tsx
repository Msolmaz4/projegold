import type { Aufgabe, Task } from "../../types";

const ConvertTaskToAufgabe = (task: Task): Aufgabe => {
  return {
    name: task.name,
    firma: task.firma || "",
    vorarbeit: task.vorarbeit,
    umsetzung: task.umsetzung,
    kontrolle: task.kontrolle,
    kosten: task.kosten,
    status: task.status === "in Bearbeitung" ? "Bearbeitung" : task.status,
    dueDate: task.dueDate,
    category: task.category as Aufgabe["category"],
    subcategory: task.subcategory as Aufgabe["subcategory"],
    fallig: task.milestoneDate,
    meilenstein: task.milestone,
  };
};

export default ConvertTaskToAufgabe;
