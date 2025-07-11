import type { Task } from "../../types/Task.types";

const TaskTemplate: Task = {
  id: new Date().getTime(),
  category: "",
  subcategory: "",
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
};

export default TaskTemplate;
