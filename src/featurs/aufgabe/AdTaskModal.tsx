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
import type { Task, KategorieListe, Subkategorie } from "../../types";

const kategorien: Record<KategorieListe, Subkategorie[]> = {
  Marketing: ["SEO", "Social Media Ads", "Cold Calls"],
  Vertrieb: ["Cold Calls", "Cold Mails"],
  Produktion: ["Home", "Work", "School"],
  Finanzierung: ["Other"],
  Technik: ["School"],
  Geschäftsführung: [],
  IT: ["Social Media Ads"],
  Logistik: [],
  Führung: [],
  Kunden: [],
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  existingTask?: Task | null;
  firmOptions?: string[];
  initialTasks?: Task[];
};

const AddTaskModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSave,
  existingTask,
  firmOptions = [],
  initialTasks = [],
}) => {
  const [task, setTask] = useState<Task>({
    id: 0,
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
    if (existingTask) {
      setTask(existingTask);
    } else if (firmOptions.length > 0) {
      const defaultFirma = firmOptions[0];
      const matchedTask = initialTasks.find((t) => t.firma === defaultFirma);

      setTask({
        id: 0,
        category: matchedTask?.category ?? "",
        subcategory: matchedTask?.subcategory ?? "",
        name: matchedTask?.name ?? "",
        vorarbeit: matchedTask?.vorarbeit ?? 0,
        umsetzung: matchedTask?.umsetzung ?? 0,
        kontrolle: matchedTask?.kontrolle ?? 0,
        kosten: matchedTask?.kosten ?? 0,
        status: "offen",
        milestone: matchedTask?.milestone ?? "",
        dueDate: matchedTask?.dueDate ?? "",
        firma: defaultFirma,
      });
    } else {
      setTask({
        id: 0,
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
  }, [existingTask, open, firmOptions, initialTasks]);

  const handleChange = (field: keyof Task, value: any) => {
    setTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleFirmaChange = (firma: string) => {
    setTask((prev) => ({ ...prev, firma }));

    const matchedTask = initialTasks.find((t) => t.firma === firma);

    if (matchedTask) {
      setTask((prev) => ({
        ...prev,
        category: matchedTask.category,
        subcategory: matchedTask.subcategory,
        name: matchedTask.name,
        vorarbeit: matchedTask.vorarbeit,
        umsetzung: matchedTask.umsetzung,
        kontrolle: matchedTask.kontrolle,
        kosten: matchedTask.kosten,
        milestone: matchedTask.milestone,
        dueDate: matchedTask.dueDate,
        status: "offen",
      }));
    } else {
      setTask((prev) => ({
        ...prev,
        category: "",
        subcategory: "",
        name: "",
        vorarbeit: 0,
        umsetzung: 0,
        kontrolle: 0,
        kosten: 0,
        milestone: "",
        dueDate: "",
        status: "offen",
      }));
    }
  };

  const handleSave = () => {
    if (!task.name.trim()) {
      alert("Bitte geben Sie einen Aufgabennamen ein.");
      return;
    }
    onSave(task);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{existingTask ? "Aufgabe bearbeiten" : "Neue Aufgabe"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
        {/* Firma */}
        <FormControl size="small" fullWidth margin="normal">
          <InputLabel id="firma-label" shrink>
            Firma
          </InputLabel>
          <Select
            labelId="firma-label"
            id="firma-select"
            value={task.firma}
            label="Firma"
            onChange={(e) => handleFirmaChange(e.target.value)}
          >
            {firmOptions.map((firma) => (
              <MenuItem key={firma} value={firma}>
                {firma}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Kategorie */}
        <FormControl size="small" fullWidth margin="normal">
          <InputLabel id="kategorie-label" shrink>
            Kategorie
          </InputLabel>
          <Select
            labelId="kategorie-label"
            id="kategorie-select"
            value={task.category}
            label="Kategorie"
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {Object.keys(kategorien).map((kat) => (
              <MenuItem key={kat} value={kat}>
                {kat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subkategorie */}
        <FormControl size="small" fullWidth margin="normal">
          <InputLabel id="subkategorie-label" shrink>
            Subkategorie
          </InputLabel>
          <Select
            labelId="subkategorie-label"
            id="subkategorie-select"
            value={task.subcategory}
            label="Subkategorie"
            onChange={(e) => handleChange("subcategory", e.target.value)}
            disabled={!task.category}
          >
            {(kategorien[task.category as KategorieListe] || []).map((sub) => (
              <MenuItem key={sub} value={sub}>
                {sub}
              </MenuItem>
            ))}
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
          inputProps={{ min: 0 }}
          margin="normal"
        />

        <TextField
          label="Umsetzung (Minuten)"
          type="number"
          value={task.umsetzung}
          onChange={(e) => handleChange("umsetzung", Number(e.target.value))}
          size="small"
          fullWidth
          inputProps={{ min: 0 }}
          margin="normal"
        />

        <TextField
          label="Kontrolle (Minuten)"
          type="number"
          value={task.kontrolle}
          onChange={(e) => handleChange("kontrolle", Number(e.target.value))}
          size="small"
          fullWidth
          inputProps={{ min: 0 }}
          margin="normal"
        />

        <TextField
          label="Kosten (€)"
          type="number"
          value={task.kosten}
          onChange={(e) => handleChange("kosten", Number(e.target.value))}
          size="small"
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
          margin="normal"
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
          <InputLabel id="status-label" shrink>
            Status
          </InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
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
        <Button variant="contained" onClick={handleSave}>
          {existingTask ? "Speichern" : "Hinzufügen"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
