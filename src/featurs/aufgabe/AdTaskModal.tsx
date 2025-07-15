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
import type { Task } from "types";
import { useUserContext } from "hooks";
import { TaskTemplate } from "core";

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
  const { categories, users } = useUserContext();
  const [task, setTask] = useState<Task>({ ...TaskTemplate });

  useEffect(() => {
    if (!open) return;

    if (existingTask) {
      const selectedCategory = categories.find(
        (cat) =>
          cat.name === existingTask.category ||
          cat.id.toString() === existingTask.categoryId
      );

      const selectedSubcategory = selectedCategory?.subcategories.find(
        (sub) =>
          sub.name === existingTask.subcategory ||
          sub.id.toString() === existingTask.subcategoryId?.toString()
      );

      setTask({
        ...existingTask,
        id: existingTask.id.toString(),
        categoryId: selectedCategory?.id.toString() || "",
        category: selectedCategory?.name || existingTask.category,
        subcategoryId: selectedSubcategory?.id.toString() || "",
        subcategory: selectedSubcategory?.name || existingTask.subcategory,
        milestoneDate:
          existingTask.milestoneDate || new Date().toISOString().split("T")[0],
      });
    } else {
      setTask({
        ...TaskTemplate,
        id: new Date().getTime().toString(),
        milestoneDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [existingTask, open, categories]);

  const handleChange = (field: keyof Task, value: any) => {
    if (field === "firma") {
      const matchedUser = users.find((user) => user.company?.name === value);
      setTask((prev) => ({
        ...prev,
        firma: value,
        email: matchedUser?.email || "",
      }));
    } else {
      setTask((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleCategoryChange = (categoryId: string) => {
    const selectedCat = categories.find(
      (cat) => cat.id.toString() === categoryId
    );
    setTask((prev) => ({
      ...prev,
      category: selectedCat ? selectedCat.name : "", // Kategori adını kaydet
      categoryId: categoryId, // Kategori ID'sini kaydet
      subcategory: "",
      subcategoryId: "", // Alt kategori seçimi sıfırla
    }));
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    const selectedCat = categories.find(
      (cat) => cat.id.toString() === task.categoryId
    );
    const selectedSub = selectedCat?.subcategories.find(
      (sub) => sub.id.toString() === subcategoryId
    );
    setTask((prev) => ({
      ...prev,
      subcategory: selectedSub ? selectedSub.name : "", // Alt kategori adını kaydet
      subcategoryId: subcategoryId, // Alt kategori ID'sini kaydet
    }));
  };

  const selectedCategory = categories.find(
    (cat) => cat.id.toString() === task.categoryId
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {existingTask ? "Aufgabe bearbeiten" : "Neue Aufgabe"}
      </DialogTitle>
      <DialogContent>
        <FormControl size="small" fullWidth margin="normal">
          <InputLabel>Firma *</InputLabel>
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
          <InputLabel>Kategorie *</InputLabel>
          <Select
            value={task.categoryId} // ID'yi kullan
            label="Kategorie"
            onChange={(e) => handleCategoryChange(e.target.value.toString())}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          size="small"
          fullWidth
          margin="normal"
          disabled={!task.categoryId} // ID'yi kontrol et
        >
          <InputLabel>Subkategorie *</InputLabel>
          <Select
            value={task.subcategoryId} // ID'yi kullan
            label="Subkategorie"
            onChange={(e) => handleSubcategoryChange(e.target.value.toString())}
          >
            {selectedCategory?.subcategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            )) || []}
          </Select>
        </FormControl>

        <TextField
          label="Aufgabenname *"
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
          label="Fälligkeitsdatum *"
          type="date"
          value={task.dueDate ? task.dueDate.split("T")[0] : ""}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const milestone = new Date(task.milestoneDate ?? "");
            const maxDate = new Date(task.milestoneDate ?? "");
            maxDate.setMonth(maxDate.getMonth() + 1);

            if (selectedDate < milestone) {
              alert(
                "Fälligkeitsdatum darf nicht vor dem Meilenstein-Datum liegen."
              );
              return;
            }
            if (selectedDate > maxDate) {
              alert(
                "Fälligkeitsdatum darf maximal 1 Monat nach dem Meilenstein-Datum liegen."
              );
              return;
            }

            handleChange("dueDate", e.target.value);
          }}
          size="small"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Meilenstein Datum *"
          type="date"
          value={task.milestoneDate ? task.milestoneDate.split("T")[0] : ""}
          onChange={(e) => handleChange("milestoneDate", e.target.value)}
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          inputProps={{
            max: task.dueDate ? task.dueDate.split("T")[0] : undefined,
          }}
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
          label="Email"
          value={task.email ?? ""}
          onChange={(e) => handleChange("email", e.target.value)}
          size="small"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button
          variant="contained"
          onClick={() => {
            if (!task.firma) {
              alert("Bitte wählen Sie eine Firma aus.");
              return;
            }
            if (!task.categoryId) {
              // ID'yi kontrol et
              alert("Bitte wählen Sie eine Kategorie aus.");
              return;
            }
            if (!task.subcategoryId) {
              // ID'yi kontrol et
              alert("Bitte wählen Sie eine Subkategorie aus.");
              return;
            }
            if (!task.name.trim()) {
              alert("Bitte geben Sie einen Aufgabennamen ein.");
              return;
            }
            if (!task.dueDate) {
              alert("Bitte geben Sie ein Fälligkeitsdatum ein.");
              return;
            }
            if (!task.milestoneDate) {
              alert("Bitte geben Sie ein Meilenstein-Datum ein.");
              return;
            }
            if (new Date(task.milestoneDate) > new Date(task.dueDate)) {
              alert(
                "Das Meilenstein-Datum darf nicht nach dem Fälligkeitsdatum liegen."
              );
              return;
            }

            // Kategori ve alt kategori isimlerini ve ID'lerini doğru şekilde ayarla
            const selectedCategory = categories.find(
              (cat) => cat.id.toString() === task.categoryId
            );
            const categoryName = selectedCategory ? selectedCategory.name : "";

            const selectedSubcategory = selectedCategory?.subcategories.find(
              (sub) => sub.id.toString() === task.subcategoryId
            );
            const subcategoryName = selectedSubcategory
              ? selectedSubcategory.name
              : "";

            const taskWithNames = {
              ...task,
              categoryId: task.categoryId,
              category: categoryName,
              subcategoryId: task.subcategoryId,
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
