import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Task } from "../../types";
import { useUser } from "../../context/UserContext";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  existingTask?: Task | null;
  firmOptions?: string[];
};

const AddTaskModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  existingTask,
  firmOptions = [],
}) => {
  const { categories } = useUser();

  const [task, setTask] = useState<Task>({
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
    dueDate: "",
    firma: "",
  });

useEffect(() => {
  console.log("existingTask:", existingTask);
  if (existingTask) {
    setTask({
      ...existingTask,
      category: existingTask.categoryId
        ? existingTask.categoryId.toString()
        : existingTask.category || "",
      subcategory: existingTask.subcategoryId
        ? existingTask.subcategoryId.toString()
        : existingTask.subcategory || "",
    });
  } else {
    setTask({
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
      dueDate: "",
      firma: "",
    });
  }
}, [existingTask, open]);

console.log("task state:", task);


  const handleChange = (field: keyof Task, value: any) =>
    setTask((prev) => ({ ...prev, [field]: value }));

  const handleCategoryChange = (categoryId: string) => {
    setTask((prev) => ({ ...prev, category: categoryId, subcategory: "" }));
  };

  const selectedCategory = categories.find(
    (cat) => cat.id.toString() === task.category
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{existingTask ? "Aufgabe bearbeiten" : "Neue Aufgabe"}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
      >
        <FormControl size="small" fullWidth margin="normal">
          <InputLabel>Firma</InputLabel>
          <Select
            value={task.firma}
            label="Firma"
            onChange={(e) => handleChange("firma", e.target.value)}
          >
            {firmOptions.map((firma) => (
              <MenuItem key={firma} value={firma}>
                {firma}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth margin="normal">
          <InputLabel>Kategorie</InputLabel>
          <Select
            value={task.category}
            label="Kategorie"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth margin="normal" disabled={!task.category}>
          <InputLabel>Subkategorie</InputLabel>
          <Select
            value={task.subcategory}
            label="Subkategorie"
            onChange={(e) => handleChange("subcategory", e.target.value)}
          >
            {selectedCategory?.subcategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id.toString()}>
                {sub.name}
              </MenuItem>
            )) || []}
          </Select>
        </FormControl>

        <TextField
          label="Aufgabenname"
          value={task.name}
          onChange={(e) => handleChange("name", e.target.value)}
          size="small"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Vorarbeit (Minuten)"
          type="number"
          value={task.vorarbeit}
          onChange={(e) => handleChange("vorarbeit", Number(e.target.value))}
          size="small"
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Umsetzung (Minuten)"
          type="number"
          value={task.umsetzung}
          onChange={(e) => handleChange("umsetzung", Number(e.target.value))}
          size="small"
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Kontrolle (Minuten)"
          type="number"
          value={task.kontrolle}
          onChange={(e) => handleChange("kontrolle", Number(e.target.value))}
          size="small"
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Kosten (€)"
          type="number"
          value={task.kosten}
          onChange={(e) => handleChange("kosten", Number(e.target.value))}
          size="small"
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: 0.01 }}
        />

        <TextField
          label="Fälligkeitsdatum"
          type="date"
          value={task.dueDate ? task.dueDate.split("T")[0] : ""}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />

        <FormControl size="small" fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={task.status}
            label="Status"
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <MenuItem value="offen">Offen</MenuItem>
            <MenuItem value="in Bearbeitung">In Bearbeitung</MenuItem>
            <MenuItem value="erledigt">Erledigt</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Milestone"
          value={task.milestone}
          onChange={(e) => handleChange("milestone", e.target.value)}
          size="small"
          fullWidth
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (!task.name.trim()) {
              alert("Bitte geben Sie einen Aufgabennamen ein.");
              return;
            }

            const selectedCategory = categories.find(
              (cat) => cat.id.toString() === task.category
            );
            const categoryName = selectedCategory ? selectedCategory.name : "";

            const selectedSubcategory = selectedCategory?.subcategories.find(
              (sub) => sub.id.toString() === task.subcategory
            );
            const subcategoryName = selectedSubcategory ? selectedSubcategory.name : "";

            const taskWithNames = {
              ...task,
              categoryId: task.category,
              category: categoryName,
              subcategoryId: task.subcategory,
              subcategory: subcategoryName,
            };

            onSave(taskWithNames);
            onClose();
          }}
        >
          {existingTask ? "Speichern" : "Hinzufügen"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
