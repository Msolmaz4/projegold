import React, { useEffect, useMemo, useState } from "react";
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
import { useUser } from "../../context/UserContext";

const extractTasksFromUsers = (users: any[]): Task[] => {
  let idCounter = 1; // It's better to ensure IDs are unique and stable if possible, especially with dnd-kit
  return users?.flatMap((user) =>
    user?.aufgabe?.map((task: any) => ({
      ...task,
      // Assign a stable ID if the backend doesn't provide one, or use existing ID
      id: task.id || `task-${idCounter++}`, // Use existing task.id if available, otherwise generate
      // Ensure category and subcategory are stored as names for display,
      // but you might need their IDs for filtering/grouping based on your 'categories' structure.
      // Assuming 'category' and 'subcategory' in 'aufgabe' already store names or IDs you can resolve.
    })) || []
  ).filter(task => task !== null); // Filter out any null/undefined tasks
};

function SortableRow({ task, onEdit, onDelete }: { task: Task; onEdit: (task: Task) => void; onDelete: (task: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMenuOpen = () => setMenuDialogOpen(true);
  const handleMenuClose = () => setMenuDialogOpen(false);

  const handleDeleteClick = () => {
    if (task.status !== "erledigt") {
      alert("Nur Aufgaben mit Status 'erledigt' können gelöscht werden!");
    } else if (window.confirm(`Möchten Sie die Aufgabe "${task.name}" wirklich löschen?`)) {
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
      <TableCell sx={{ maxWidth: 140, whiteSpace: "normal", wordWrap: "break-word" }}>
        {task.name}
      </TableCell>
      <TableCell>{task.vorarbeit} min</TableCell>
      <TableCell>{task.umsetzung} min</TableCell>
      <TableCell>{task.kontrolle} min</TableCell>
      <TableCell>{task.kosten} €</TableCell>
      <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString("de-DE") : "—"}</TableCell>
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
      <TableCell>
        {task.milestoneDate ? new Date(task.milestoneDate).toLocaleDateString("de-DE") : "—"}
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" ref={anchorRef} onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorRef.current} open={menuDialogOpen} onClose={handleMenuClose}>
          <MenuItem onClick={() => { onEdit(task); handleMenuClose(); }}>
            Bearbeiten
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>Löschen</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
}

const TaskTable: React.FC = () => {
  const { categories, users, setUsers } = useUser();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]); // This will now be primarily derived
  const [openDialog, setOpenDialog] = useState(false); // For adding a new task
  const [editDialogOpen, setEditDialogOpen] = useState(false); // For editing an existing task
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Effect to re-extract tasks whenever 'users' changes
  useEffect(() => {
    const userTasks = extractTasksFromUsers(users);
    setTasks(userTasks);
  }, [users]);

  const uniqueFirms = useMemo(() => {
    // Only include firms from users, as tasks will belong to these users
    return Array.from(new Set(users.filter((u) => u?.company?.name).map((u) => u.company.name)));
  }, [users]); // Depend only on users, as tasks are derived from users

  const handleAddTask = (newTask: Task) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.company?.name === newTask.firma) {
          // Ensure a unique ID for the new task if it's not coming from a backend
          const newTaskId = newTask.id || new Date().getTime();

          const newAufgabe = user.aufgabe ? [...user.aufgabe] : [];
          newAufgabe.push({ ...newTask, id: newTaskId });

          let updatedTasks = user.tasks ? [...user.tasks] : [];
          const categoryIndex = updatedTasks.findIndex((taskCategory: any) => taskCategory.name === newTask.category);

          const newMilestone = {
            title: newTask.name,
            fallig: newTask.milestoneDate,
            meilenstein: newTask.milestoneDate,
            id: newTaskId,
            completed: false,
            status: newTask.status,
            category: newTask.category,
            firma: newTask.firma,
          };

          if (categoryIndex !== -1) {
            const milestones = updatedTasks[categoryIndex].milestones || [];
            const exists = milestones.some(
              (m: any) => m.title === newMilestone.title && m.fallig === newMilestone.fallig
            );
            if (!exists) {
              milestones.push(newMilestone);
            }
            updatedTasks[categoryIndex] = {
              ...updatedTasks[categoryIndex],
              milestones,
            };
          } else {
            updatedTasks.push({
              name: newTask.category,
              milestones: [newMilestone],
            });
          }

          return {
            ...user,
            aufgabe: newAufgabe,
            tasks: updatedTasks,
          };
        }
        return user;
      })
    );
    // The useEffect will re-extract tasks after setUsers updates
  };

  const handleEditTask = (taskToEdit: Task) => {
    setSelectedTask(taskToEdit);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (editedTask: Task) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        // Find if this user owns the task being edited
        const taskInUserAufgabe = user.aufgabe?.find((t: any) => t.id === editedTask.id);

        if (taskInUserAufgabe) {
          // Update task in 'aufgabe'
          const updatedAufgabe = user.aufgabe.map((t: any) =>
            t.id === editedTask.id ? editedTask : t
          );

          // Update task in 'tasks' (milestones)
          let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];

          // First, remove the old milestone (if exists in the old category)
          // This handles cases where category or subcategory might have changed during edit
          updatedTasksMilestones = updatedTasksMilestones.map((taskCategory: any) => {
            if (taskCategory.milestones) {
              return {
                ...taskCategory,
                milestones: taskCategory.milestones.filter((m: any) => m.id !== editedTask.id),
              };
            }
            return taskCategory;
          }).filter((taskCategory: any) => taskCategory.milestones && taskCategory.milestones.length > 0); // Remove empty categories

          // Then, add the updated milestone to the correct (potentially new) category
          const newMilestone = {
            title: editedTask.name,
            fallig: editedTask.milestoneDate,
            meilenstein: editedTask.milestoneDate,
            id: editedTask.id,
            completed: editedTask.status === "erledigt", // Update completed status based on task status
            status: editedTask.status,
            category: editedTask.category,
            firma: editedTask.firma,
          };

          const categoryIndex = updatedTasksMilestones.findIndex(
            (taskCategory: any) => taskCategory.name === editedTask.category
          );

          if (categoryIndex !== -1) {
            updatedTasksMilestones[categoryIndex] = {
              ...updatedTasksMilestones[categoryIndex],
              milestones: [...updatedTasksMilestones[categoryIndex].milestones, newMilestone],
            };
          } else {
            updatedTasksMilestones.push({
              name: editedTask.category,
              milestones: [newMilestone],
            });
          }

          return {
            ...user,
            aufgabe: updatedAufgabe,
            tasks: updatedTasksMilestones,
          };
        }
        return user;
      })
    );

    setEditDialogOpen(false);
    setSelectedTask(null);
    // The useEffect will handle updating the local 'tasks' state.
  };

  const handleDeleteTask = (taskToDelete: Task) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        // Only modify the user who owns this task
        const taskInUserAufgabe = user.aufgabe?.find((t: any) => t.id === taskToDelete.id);

        if (taskInUserAufgabe) {
          // Remove from 'aufgabe'
          const updatedAufgabe = user.aufgabe.filter((t: any) => t.id !== taskToDelete.id);

          // Remove from 'tasks' (milestones)
          let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];
          updatedTasksMilestones = updatedTasksMilestones.map((taskCategory: any) => {
            if (taskCategory.milestones) {
              return {
                ...taskCategory,
                milestones: taskCategory.milestones.filter((m: any) => m.id !== taskToDelete.id),
              };
            }
            return taskCategory;
          }).filter((taskCategory: any) => taskCategory.milestones && taskCategory.milestones.length > 0); // Remove empty categories

          return {
            ...user,
            aufgabe: updatedAufgabe,
            tasks: updatedTasksMilestones,
          };
        }
        return user;
      })
    );
    // The useEffect will handle updating the local 'tasks' state.
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true) &&
      (firmaFilter ? task.firma === firmaFilter : true)
  );

  const grouped = filteredTasks.reduce((acc, task) => {
    // Ensure that category and subcategory are represented by their names for grouping
    const catObj = categories.find((c) => c.id.toString() === task.categoryId || c.name === task.category);
    const subObj = catObj?.subcategories.find((s) => s.id === task.subcategoryId || s.name === task.subcategory);

    const catName = catObj?.name || task.category;
    const subName = subObj?.name || task.subcategory;

    const key = `${catName} > ${subName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const onDragEnd = ({ active, over }: { active: { id: string | number }; over: { id: string | number } | null }) => {
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (!activeTask || !overTask) return;

    // Get original category/subcategory IDs for active and over tasks
    const activeCatObj = categories.find(c => c.name === activeTask.category);
    const activeSubObj = activeCatObj?.subcategories.find(s => s.name === activeTask.subcategory);
    const overCatObj = categories.find(c => c.name === overTask.category);
    const overSubObj = overCatObj?.subcategories.find(s => s.name === overTask.subcategory);

    const oldCategoryName = activeCatObj?.name || activeTask.category;
    const oldSubcategoryName = activeSubObj?.name || activeTask.subcategory;

    const newCategoryName = overCatObj?.name || overTask.category;
    const newSubcategoryName = overSubObj?.name || overTask.subcategory;

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        // Only consider the user who owns the active task
        const isOwner = user.company?.name === activeTask.firma;

        if (isOwner) {
          // Find the active task in the user's 'aufgabe' array
          const taskIndexInAufgabe = user.aufgabe?.findIndex((t: any) => t.id === active.id);

          if (taskIndexInAufgabe !== -1 && user.aufgabe) {
            const updatedAufgabe = [...user.aufgabe];
            const movedTask = { ...updatedAufgabe[taskIndexInAufgabe] };

            if (`${oldCategoryName}>${oldSubcategoryName}` === `${newCategoryName}>${newSubcategoryName}`) {
              // Reordering within the same group (category/subcategory)
              const groupTasksInUser = updatedAufgabe.filter(t =>
                (categories.find(c => c.id.toString() === t.categoryId || c.name === t.category)?.name || t.category) === oldCategoryName &&
                (categories.flatMap(c => c.subcategories).find(s => s.id === t.subcategoryId || s.name === t.subcategory)?.name || t.subcategory) === oldSubcategoryName
              );

              const oldIndexInGroup = groupTasksInUser.findIndex((t: any) => t.id === active.id);
              const newIndexInGroup = groupTasksInUser.findIndex((t: any) => t.id === over.id);

              const reorderedGroup = arrayMove(groupTasksInUser, oldIndexInGroup, newIndexInGroup);

              // Replace the tasks in the main 'aufgabe' array
              const otherTasks = updatedAufgabe.filter(t =>
                !((categories.find(c => c.id.toString() === t.categoryId || c.name === t.category)?.name || t.category) === oldCategoryName &&
                  (categories.flatMap(c => c.subcategories).find(s => s.id === t.subcategoryId || s.name === t.subcategory)?.name || t.subcategory) === oldSubcategoryName)
              );
              user.aufgabe = [...otherTasks, ...reorderedGroup];

            } else {
              // Moving to a different group (category/subcategory)
              movedTask.category = newCategoryName; // Update category name
              movedTask.subcategory = newSubcategoryName; // Update subcategory name
              movedTask.categoryId = overCatObj?.id.toString(); // Update category ID
              movedTask.subcategoryId = overSubObj?.id; // Update subcategory ID
              movedTask.status = "in Bearbeitung"; // Status change on group move

              // Remove from old location and add to new (conceptually)
              updatedAufgabe.splice(taskIndexInAufgabe, 1); // Remove old
              updatedAufgabe.push(movedTask); // Add new (at the end for now, ordering will be handled by sorting)
              user.aufgabe = updatedAufgabe;
            }

            // Also update the 'tasks' (milestones) array for the user
            let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];

            // Remove the milestone from its previous location
            updatedTasksMilestones = updatedTasksMilestones.map((taskCategory: any) => {
              if (taskCategory.milestones) {
                return {
                  ...taskCategory,
                  milestones: taskCategory.milestones.filter((m: any) => m.id !== active.id),
                };
              }
              return taskCategory;
            }).filter((taskCategory: any) => taskCategory.milestones && taskCategory.milestones.length > 0); // Remove empty categories

            // Create the updated milestone
            const updatedMilestone = {
              title: movedTask.name,
              fallig: movedTask.milestoneDate,
              meilenstein: movedTask.milestoneDate,
              id: movedTask.id,
              completed: movedTask.status === "erledigt",
              status: movedTask.status,
              category: movedTask.category,
              firma: movedTask.firma,
            };

            // Add the updated milestone to its new category
            const targetCategoryIndex = updatedTasksMilestones.findIndex(
              (taskCategory: any) => taskCategory.name === updatedMilestone.category
            );

            if (targetCategoryIndex !== -1) {
              updatedTasksMilestones[targetCategoryIndex] = {
                ...updatedTasksMilestones[targetCategoryIndex],
                milestones: [...updatedTasksMilestones[targetCategoryIndex].milestones, updatedMilestone],
              };
            } else {
              updatedTasksMilestones.push({
                name: updatedMilestone.category,
                milestones: [updatedMilestone],
              });
            }

            return {
              ...user,
              aufgabe: user.aufgabe, // This already has the modified array
              tasks: updatedTasksMilestones,
            };
          }
        }
        return user;
      })
    );
    // The useEffect will re-extract tasks after setUsers updates
  };


  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Firma</InputLabel>
          <Select value={firmaFilter} label="Firma" onChange={(e) => setFirmaFilter(e.target.value)}>
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
          <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
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

      <AddTaskModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        existingTask={selectedTask}
        firmOptions={uniqueFirms}
      />

      <AddTaskModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleAddTask}
        firmOptions={uniqueFirms}
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
                    <TableCell>Fällig</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Meilenstein</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <SortableContext items={groupTasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
                  <TableBody>
                    {groupTasks.map((task) => (
                      <SortableRow key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
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