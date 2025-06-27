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
  TextField
} from "@mui/material";
import { useState } from "react";

import type { Task, KategorieListe, Subkategorie } from '../../types'



type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (newTask: Task) => void;
};


const kategorien: Record<KategorieListe, Subkategorie[]> = {
  Marketing: ["SEO", "Social Media Ads", "Cold Calls"],
  Vertrieb: ["Cold Calls", "Cold Mails"],
  Produktion: ["Home", "Work", "School"],
  Finanzierung: ['Other'],
  Technik: ['School'],
  Geschäftsführung: [],
  IT: ['Social Media Ads'],
  Logistik: [],
  Führung: [],
  Kunden: [],
};

const AddTaskModal: React.FC<ModalProps> = ({ open, onClose, onSave }) => {
  const [newTask, setNewTask] = useState<Task>({
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
    dueDate: ""
  });

  const handleSave = () => {
    onSave(newTask);
    setNewTask({
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
      dueDate: ""
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Neue Aufgabe hinzufügen</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Kategorie</InputLabel>
          <Select
            value={newTask.category}
            label="Kategorie"
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value, subcategory: "" })
            }
          >
            {Object.keys(kategorien).map((k) => (
              <MenuItem key={k} value={k}>
                {k}
              </MenuItem>
            ))}
            {/*   bize bozledeonecek
                  const kategorien = {
                  Marketing: ["SEO", "Content"],const kategorien = {
                  Marketing: ["SEO", "Content"],
                  Development: ["Frontend", "Backend"],
                  Design: ["UX/UI", "Branding"], };
                  Development: ["Frontend", "Backend"],
                  Design: ["UX/UI", "Branding"],
                  }; */}



          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!newTask.category}>
          <InputLabel>Untergebiet</InputLabel>
          <Select
            value={newTask.subcategory}
            label="Untergebiet"
            onChange={(e) =>
              setNewTask({ ...newTask, subcategory: e.target.value as Subkategorie })
            }
          >
            {newTask.category &&
              kategorien[newTask.category]?.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <TextField
          label="Aufgabenname"
          fullWidth
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <TextField
          label="Vorarbeit (min)"
          type="number"
          value={newTask.vorarbeit}
          onChange={(e) => setNewTask({ ...newTask, vorarbeit: +e.target.value })}
        />
        <TextField
          label="Umsetzung (min)"
          type="number"
          value={newTask.umsetzung}
          onChange={(e) => setNewTask({ ...newTask, umsetzung: +e.target.value })}
        />
        <TextField
          label="Kontrolle (min)"
          type="number"
          value={newTask.kontrolle}
          onChange={(e) => setNewTask({ ...newTask, kontrolle: +e.target.value })}
        />
        <TextField
          label="Kosten (€)"
          type="number"
          value={newTask.kosten}
          onChange={(e) => setNewTask({ ...newTask, kosten: +e.target.value })}
        />
        <TextField
          label="Meilenstein (isteğe bağlı)"
          fullWidth
          value={newTask.milestone || ""}
          onChange={(e) => setNewTask({ ...newTask, milestone: e.target.value })}
        />
        <TextField
          label="Son Tarih"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newTask.dueDate || ""}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button variant="contained" onClick={handleSave}>
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;
