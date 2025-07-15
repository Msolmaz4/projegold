import type { Task } from "../../types/Task.types";

const TaskTemplate: Task = {
  id: new Date().getTime().toString(),
  category: "",
  categoryId: "",
  subcategory: "",
  subcategoryId: "",
  name: "",
  vorarbeit: 0,
  umsetzung: 0,
  kontrolle: 0,
  kosten: 0,
  status: "offen",
  milestone: "",
  milestoneDate: "",
  dueDate: "",
  firma: "",
  milestones: [],
  email: "",
};

export default TaskTemplate;
