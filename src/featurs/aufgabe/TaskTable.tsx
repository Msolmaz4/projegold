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
import type { Task } from "types";
import { useUserContext } from "hooks";
import { SendEmailToUser } from "core";

// Helper function to extract tasks from users
const extractTasksFromUsers = (users: any[]): Task[] => {
  let idCounter = 1;
  return users
    ?.flatMap(
      (user) =>
        user?.aufgabe?.map((task: any) => ({
          ...task,
          id: (task.id || `task-${idCounter++}`).toString(),
          email: user.email,
        })) || []
    )
    .filter((task) => task !== null);
};

// Helper function to get Chip color based on task status
const getStatusChipColor = (status: string) => {
  switch (status) {
    case "offen":
      return "warning";
    case "erledigt":
      return "success";
    case "in Bearbeitung":
      return "info";
    default:
      return "default";
  }
};

// Helper function to get category and subcategory details
const getCategoryAndSubcategoryDetails = (task: Task, categories: any[]) => {
  const catObj = categories.find(
    (c) => c.id?.toString() === task.categoryId || c.name === task.category
  );
  const subObj = catObj?.subcategories.find(
    (s: any) => s.id === task.subcategoryId || s.name === task.subcategory
  );
  const catName = catObj?.name || task.category;
  const subName = subObj?.name || task.subcategory;
  return { catObj, subObj, catName, subName };
};

// Helper function to update user's aufgabe and tasks (milestones)
const updateUserAufgabeAndTasks = (
  prevUsers: any[],
  task: Task,
  action: "add" | "update" | "delete" | "drag",
  categories: any[],
  oldFirm?: string,
  activeId?: string | number,
  overId?: string | number,
  oldCategoryName?: string,
  oldSubcategoryName?: string,
  newCategoryName?: string,
  newSubcategoryName?: string
) => {
  return prevUsers.map((user) => {
    const isOwner = user.company?.name === task.firma;
    const isOldFirm = oldFirm && user.company?.name === oldFirm;

    let updatedAufgabe = user.aufgabe ? [...user.aufgabe] : [];
    let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];

    if (
      action === "delete" &&
      user.aufgabe?.some((t: any) => t.id === task.id)
    ) {
      updatedAufgabe = updatedAufgabe.filter((t: any) => t.id !== task.id);
      updatedTasksMilestones = updatedTasksMilestones
        .map((taskCategory: any) => ({
          ...taskCategory,
          milestones: taskCategory.milestones?.filter(
            (m: any) => m.id !== task.id
          ),
        }))
        .filter((taskCategory: any) => taskCategory.milestones?.length > 0);
      SendEmailToUser(
        user.email,
        "Aufgabe gelöscht",
        `Aufgabe gelöscht: ${task.name} (${task.category})`
      );
    } else if (action === "add" && isOwner) {
      updatedAufgabe.push({ ...task, id: task.id });
      const newMilestone = {
        title: task.name,
        fallig: task.milestoneDate,
        meilenstein: task.milestoneDate,
        id: task.id,
        completed: false,
        status: task.status,
        category: task.category,
        firma: task.firma,
      };
      const categoryIndex = updatedTasksMilestones.findIndex(
        (taskCategory: any) => taskCategory.name === task.category
      );
      if (categoryIndex !== -1) {
        const milestones =
          updatedTasksMilestones[categoryIndex].milestones || [];
        const exists = milestones.some(
          (m: any) =>
            m.title === newMilestone.title && m.fallig === newMilestone.fallig
        );
        if (!exists) {
          milestones.push(newMilestone);
        }
        updatedTasksMilestones[categoryIndex] = {
          ...updatedTasksMilestones[categoryIndex],
          milestones,
        };
      } else {
        updatedTasksMilestones.push({
          name: task.category,
          milestones: [newMilestone],
        });
      }
      SendEmailToUser(
        user.email,
        "Neue Aufgabe zugewiesen",
        `Neue Mission: ${task.name} (${task.category})`
      );
    } else if (action === "update") {
      if (isOldFirm) {
        updatedAufgabe = updatedAufgabe.filter((t: any) => t.id !== task.id);
        updatedTasksMilestones = updatedTasksMilestones
          .map((taskCategory: any) => ({
            ...taskCategory,
            milestones: taskCategory.milestones?.filter(
              (m: any) => m.id !== task.id
            ),
          }))
          .filter((taskCategory: any) => taskCategory.milestones?.length > 0);
      }
      if (isOwner) {
        updatedAufgabe.push(task);
        const newMilestone = {
          title: task.name,
          fallig: task.milestoneDate,
          meilenstein: task.milestoneDate,
          id: task.id,
          completed: task.status === "erledigt",
          status: task.status,
          category: task.category,
          firma: task.firma,
        };
        const categoryIndex = updatedTasksMilestones.findIndex(
          (taskCategory: any) => taskCategory.name === task.category
        );
        if (categoryIndex !== -1) {
          const milestones =
            updatedTasksMilestones[categoryIndex].milestones || [];
          const exists = milestones.some(
            (m: any) =>
              m.title === newMilestone.title && m.fallig === newMilestone.fallig
          );
          if (!exists) {
            milestones.push(newMilestone);
          }
          updatedTasksMilestones[categoryIndex] = {
            ...updatedTasksMilestones[categoryIndex],
            milestones,
          };
        } else {
          updatedTasksMilestones.push({
            name: task.category,
            milestones: [newMilestone],
          });
        }
        SendEmailToUser(
          user.email,
          "Aufgabe aktualisieren",
          `Aktualisierte Mission: ${task.name} (${task.category})`
        );
      }
    } else if (action === "drag" && isOwner && activeId && overId) {
      const taskIndexInAufgabe = updatedAufgabe.findIndex(
        (t: any) => t.id === activeId
      );
      if (taskIndexInAufgabe !== -1) {
        const movedTask = { ...updatedAufgabe[taskIndexInAufgabe] };

        if (
          `${oldCategoryName}>${oldSubcategoryName}` ===
          `${newCategoryName}>${newSubcategoryName}`
        ) {
          const groupTasksInUser = updatedAufgabe.filter((t) => {
            const { catName, subName } = getCategoryAndSubcategoryDetails(
              t,
              categories
            );
            return (
              catName === oldCategoryName && subName === oldSubcategoryName
            );
          });

          const oldIndexInGroup = groupTasksInUser.findIndex(
            (t: any) => t.id === activeId
          );
          const newIndexInGroup = groupTasksInUser.findIndex(
            (t: any) => t.id === overId
          );
          const reorderedGroup = arrayMove(
            groupTasksInUser,
            oldIndexInGroup,
            newIndexInGroup
          );
          const otherTasks = updatedAufgabe.filter((t) => {
            const { catName, subName } = getCategoryAndSubcategoryDetails(
              t,
              categories
            );
            return !(
              catName === oldCategoryName && subName === oldSubcategoryName
            );
          });
          updatedAufgabe = [...otherTasks, ...reorderedGroup];
        } else {
          if (
            newCategoryName &&
            ["Marketing", "Development", "Design", "Fulfillment"].includes(
              newCategoryName
            )
          ) {
            movedTask.category = newCategoryName as typeof movedTask.category;
          }
          if (
            typeof newSubcategoryName === "string" &&
            [
              "SEO",
              "Google Ads",
              "Social Media",
              "PDF Programmierung",
              "Webformula",
              "Backend",
              "UX/UI",
            ].includes(newSubcategoryName)
          ) {
            movedTask.subcategory =
              newSubcategoryName as typeof movedTask.subcategory;
          }
          const { catObj: overCatObj, subObj: overSubObj } =
            getCategoryAndSubcategoryDetails(task, categories);
          movedTask.categoryId = overCatObj?.id?.toString();
          movedTask.subcategoryId = overSubObj?.id;
          movedTask.status = "in Bearbeitung"; // Status changed to "in Bearbeitung" on drag

          updatedAufgabe.splice(taskIndexInAufgabe, 1);
          updatedAufgabe.push(movedTask);
        }

        updatedTasksMilestones = updatedTasksMilestones
          .map((taskCategory: any) => ({
            ...taskCategory,
            milestones: taskCategory.milestones?.filter(
              (m: any) => m.id !== activeId
            ),
          }))
          .filter((taskCategory: any) => taskCategory.milestones?.length > 0);

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

        const targetCategoryIndex = updatedTasksMilestones.findIndex(
          (taskCategory: any) => taskCategory.name === updatedMilestone.category
        );

        if (targetCategoryIndex !== -1) {
          updatedTasksMilestones[targetCategoryIndex] = {
            ...updatedTasksMilestones[targetCategoryIndex],
            milestones: [
              ...updatedTasksMilestones[targetCategoryIndex].milestones,
              updatedMilestone,
            ],
          };
        } else {
          updatedTasksMilestones.push({
            name: updatedMilestone.category,
            milestones: [updatedMilestone],
          });
        }
      }
    }

    return {
      ...user,
      aufgabe: updatedAufgabe,
      tasks: updatedTasksMilestones,
    };
  });
};

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
      <TableCell
        sx={{ maxWidth: 140, whiteSpace: "normal", wordWrap: "break-word" }}
      >
        {task.name}
      </TableCell>
      <TableCell>{task.vorarbeit} min</TableCell>
      <TableCell>{task.umsetzung} min</TableCell>
      <TableCell>{task.kontrolle} min</TableCell>
      <TableCell>{task.kosten} €</TableCell>
      <TableCell>
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString("de-DE")
          : "—"}
      </TableCell>
      <TableCell>
        <Chip
          size="small"
          label={task.status}
          color={getStatusChipColor(task.status)}
        />
      </TableCell>
      <TableCell>
        {task.milestoneDate
          ? new Date(task.milestoneDate).toLocaleDateString("de-DE")
          : "—"}
      </TableCell>
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
  const { categories, users, setUsers } = useUserContext();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const userTasks = extractTasksFromUsers(users);
    setTasks(userTasks);
  }, [users]);

  const uniqueFirms = useMemo(() => {
    return Array.from(
      new Set(users.filter((u) => u?.company?.name).map((u) => u.company.name))
    );
  }, [users]);

  const handleAddTask = (newTask: Task) => {
    setUsers((prevUsers) =>
      updateUserAufgabeAndTasks(prevUsers, newTask, "add", categories)
    );
  };

  const handleEditTask = (taskToEdit: Task) => {
    setSelectedTask(taskToEdit);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = (editedTask: Task) => {
    setUsers((prevUsers) => {
      let oldFirm = "";
      for (const user of prevUsers) {
        if (user.aufgabe?.some((t: any) => t.id === editedTask.id)) {
          oldFirm = user.company?.name || "";
          break;
        }
      }
      return updateUserAufgabeAndTasks(
        prevUsers,
        editedTask,
        "update",
        categories,
        oldFirm
      );
    });
    setEditDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskToDelete: Task) => {
    setUsers((prevUsers) =>
      updateUserAufgabeAndTasks(prevUsers, taskToDelete, "delete", categories)
    );
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? task.status === statusFilter : true) &&
      (firmaFilter ? task.firma === firmaFilter : true)
  );

  const grouped = filteredTasks.reduce(
    (acc, task) => {
      const { catName, subName } = getCategoryAndSubcategoryDetails(
        task,
        categories
      );
      const key = `${catName} > ${subName}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  const onDragEnd = ({
    active,
    over,
  }: {
    active: { id: string | number };
    over: { id: string | number } | null;
  }) => {
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (!activeTask || !overTask) return;

    const { catName: oldCategoryName, subName: oldSubcategoryName } =
      getCategoryAndSubcategoryDetails(activeTask, categories);
    const { catName: newCategoryName, subName: newSubcategoryName } =
      getCategoryAndSubcategoryDetails(overTask, categories);

    setUsers((prevUsers) =>
      updateUserAufgabeAndTasks(
        prevUsers,
        activeTask,
        "drag",
        categories,
        undefined, // oldFirm is not relevant for drag
        active.id,
        over.id,
        oldCategoryName,
        oldSubcategoryName,
        newCategoryName,
        newSubcategoryName
      )
    );
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
