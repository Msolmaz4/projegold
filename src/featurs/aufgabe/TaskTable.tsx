import React, { useState, useRef } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  IconButton,
  MenuItem,
  Menu,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddTaskModal from "./AdTaskModal"; 
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../types";
import { initialTasks } from "../../data";

function SortableRow({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMenuOpen = () => setMenuDialogOpen(true);
  const handleMenuClose = () => setMenuDialogOpen(false);

  const handleDeleteClick = () => {
    if (task.status !== "erledigt") {
      alert("Nur Aufgaben mit Status 'erledigt' können gelöscht werden!");
    } else if (
      window.confirm(`Möchten Sie die Aufgabe "${task.name}" wirklich löschen?`)
    ) {
      onDelete(task);
    }
    handleMenuClose();
  };

  return (
    <TableRow ref={setNodeRef} style={style} hover>
      <TableCell sx={{ width: 40 }}>
        <IconButton {...attributes} {...listeners}>
          <DragIndicatorIcon fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell>{task.name}</TableCell>
      <TableCell>{task.vorarbeit} min</TableCell>
      <TableCell>{task.umsetzung} min</TableCell>
      <TableCell>{task.kontrolle} min</TableCell>
      <TableCell>{task.kosten} €</TableCell>
      <TableCell>
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString("de-DE") : "—"}
      </TableCell>
      <TableCell>
        <Chip
          size="small"
          label={task.status}
          color={
            task.status === "offen"
              ? "warning"
              : task.status === "erledigt"
              ? "success"
              : task.status === "in Bearbeitung"
              ? "info"
              : "default"
          }
        />
      </TableCell>
      <TableCell>{task.milestone || "—"}</TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" ref={anchorRef} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorRef.current}
          open={menuDialogOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              onEdit(task);
              handleMenuClose();
            }}
          >
            Bearbeiten
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Löschen</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

const TaskTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Tüm benzersiz firmalar (boş olmayan)
  const uniqueFirms = Array.from(new Set(tasks.map((t) => t.firma))).filter(Boolean);

  // Yeni görev ekleme
  const handleAddTask = (newTask: Task) => {
    const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
    setTasks((prev) => [...prev, { ...newTask, id: maxId + 1 }]);
  };

  // Görev düzenleme açma
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
  };

  // Düzenlenen görevi kaydetme
  const handleSaveEdit = (editedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editedTask.id ? editedTask : t))
    );
    setEditDialogOpen(false);
    setSelectedTask(null);
  };

  // Görev silme
  const handleDeleteTask = (taskToDelete: Task) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
  };

  // Filtrelenmiş görevler
  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true) &&
      (firmaFilter ? task.firma === firmaFilter : true)
  );

  // Görevleri kategori > alt kategoriye göre grupla
  const grouped = filteredTasks.reduce((acc, task) => {
    const key = `${task.category} > ${task.subcategory}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Sürükle bırak sonrası
  const onDragEnd = ({
    active,
    over,
  }: {
    active: { id: number };
    over: { id: number } | null;
  }) => {
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);
    if (!activeTask || !overTask) return;

    const oldGroup = `${activeTask.category} > ${activeTask.subcategory}`;
    const newGroup = `${overTask.category} > ${overTask.subcategory}`;

    let updatedTasks = [...tasks];

    if (oldGroup === newGroup) {
      // Aynı grup içindeyse sırayı değiştir
      const groupTasks = tasks.filter(
        (t) => `${t.category} > ${t.subcategory}` === oldGroup
      );
      const oldIndex = groupTasks.findIndex((t) => t.id === active.id);
      const newIndex = groupTasks.findIndex((t) => t.id === over.id);
      const reordered = arrayMove(groupTasks, oldIndex, newIndex);

      const others = tasks.filter(
        (t) => `${t.category} > ${t.subcategory}` !== oldGroup
      );

      updatedTasks = [...others, ...reordered];
    } else {
      // Grup değişirse kategori, alt kategori ve durum güncellenir
      const [newCategory, newSubcategory] = newGroup.split(" > ");
      updatedTasks = updatedTasks.map((t) =>
        t.id === active.id
          ? {
              ...t,
              category: newCategory,
              subcategory: newSubcategory,
              status: "in Bearbeitung",
            }
          : t
      );
    }

    setTasks(updatedTasks);
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Firma</InputLabel>
          <Select
            value={firmaFilter}
            label="Firma"
            onChange={(e) => setFirmaFilter(e.target.value)}
          >
            <MenuItem value="">Alle Firmen</MenuItem>
            {uniqueFirms.map((firma) => (
              <MenuItem key={firma} value={firma}>
                {firma}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Suche Aufgaben nach..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">Alles</MenuItem>
            <MenuItem value="offen">Offen</MenuItem>
            <MenuItem value="in Bearbeitung">In Bearbeitung</MenuItem>
            <MenuItem value="erledigt">Erledigt</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          + Aufgabe hinzufügen
        </Button>
      </Box>

      {/* Düzenleme modalı */}
      <AddTaskModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        existingTask={selectedTask}
        firmOptions={uniqueFirms}
        initialTasks={initialTasks}
      />

      {/* Ekleme modalı */}
      <AddTaskModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddTask}
        firmOptions={uniqueFirms}
        initialTasks={initialTasks}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        {Object.entries(grouped).map(([group, groupTasks]) => (
          <Box key={group} mb={4}>
            <Typography variant="h6" gutterBottom>
              {group}
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Aufgabe</TableCell>
                    <TableCell>Vorarbeit</TableCell>
                    <TableCell>Umsetzung</TableCell>
                    <TableCell>Kontrolle</TableCell>
                    <TableCell>Kosten</TableCell>
                    <TableCell>Fällig am</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Milestone</TableCell>
                    <TableCell align="right">Aktionen</TableCell>
                  </TableRow>
                </TableHead>
                <SortableContext
                  items={groupTasks.map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <TableBody>
                    {groupTasks.map((task) => (
                      <SortableRow
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </TableBody>
                </SortableContext>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </DndContext>
    </Box>
  );
};

export default TaskTable;
