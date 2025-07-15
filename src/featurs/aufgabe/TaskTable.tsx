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

const extractTasksFromUsers = (users: any[]): Task[] => {
  let idCounter = 1;
  return users
    ?.flatMap(
      (user) =>
        user?.aufgabe?.map((task: any) => ({
          ...task,
          // ID'yi her zaman string olarak garanti altına al
          id: (task.id || `task-${idCounter++}`).toString(),
          email: user.email,
        })) || []
    )
    .filter((task) => task !== null);
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

  //const resend = new Resend(import.meta.env.VITE_APP_NAME);
  //const resend = new Resend('re_DbgWj3qs_HgnY42PviabuFemxKybsLU9z');

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
      prevUsers.map((user) => {
        if (user.company?.name === newTask.firma) {
          // newTask.id artık AddTaskModal'dan string olarak geliyor, doğrudan kullanabiliriz.
          const newTaskId = newTask.id;
          const newAufgabe = user.aufgabe ? [...user.aufgabe] : [];
          newAufgabe.push({ ...newTask, id: newTaskId });

          let updatedTasks = user.tasks ? [...user.tasks] : [];
          const categoryIndex = updatedTasks.findIndex(
            (taskCategory: any) => taskCategory.name === newTask.category
          );
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
              (m: any) =>
                m.title === newMilestone.title &&
                m.fallig === newMilestone.fallig
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
          SendEmailToUser(
            user.email,
            "Neue Aufgabe zugewiesen",
            `Neue Mission: ${newTask.name} (${newTask.category})`
          );

          return {
            ...user,
            aufgabe: newAufgabe,
            tasks: updatedTasks,
          };
        }
        return user;
      })
    );
  };

  const handleEditTask = (taskToEdit: Task) => {
    setSelectedTask(taskToEdit);
    setEditDialogOpen(true);
  };
  const handleSaveEdit = (editedTask: Task) => {
    setUsers((prevUsers) => {
      // Eski görevi (id ile) bul ve hangi firma olduğunu öğren
      let oldFirm = "";
      for (const user of prevUsers) {
        if (user.aufgabe?.some((t: any) => t.id === editedTask.id)) {
          oldFirm = user.company?.name || "";
          break;
        }
      }

      return prevUsers
        .map((user) => {
          // Eğer kullanıcı eski firmadaysa, görev silinecek
          if (user.company?.name === oldFirm) {
            const updatedAufgabe = user.aufgabe?.filter(
              (t: any) => t.id !== editedTask.id
            );
            let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];
            updatedTasksMilestones = updatedTasksMilestones
              .map((taskCategory: any) => {
                if (taskCategory.milestones) {
                  return {
                    ...taskCategory,
                    milestones: taskCategory.milestones.filter(
                      (m: any) => m.id !== editedTask.id
                    ),
                  };
                }
                return taskCategory;
              })
              .filter(
                (taskCategory: any) =>
                  taskCategory.milestones && taskCategory.milestones.length > 0
              );

            return {
              ...user,
              aufgabe: updatedAufgabe,
              tasks: updatedTasksMilestones,
            };
          }
          return user;
        })
        .map((user) => {
          // Eğer kullanıcı yeni firmadaysa, görev eklenecek / güncellenecek
          if (user.company?.name === editedTask.firma) {
            const newAufgabe = user.aufgabe ? [...user.aufgabe] : [];
            newAufgabe.push(editedTask);

            let updatedTasks = user.tasks ? [...user.tasks] : [];
            const categoryIndex = updatedTasks.findIndex(
              (taskCategory: any) => taskCategory.name === editedTask.category
            );
            const newMilestone = {
              title: editedTask.name,
              fallig: editedTask.milestoneDate,
              meilenstein: editedTask.milestoneDate,
              id: editedTask.id,
              completed: editedTask.status === "erledigt",
              status: editedTask.status,
              category: editedTask.category,
              firma: editedTask.firma,
            };

            if (categoryIndex !== -1) {
              const milestones = updatedTasks[categoryIndex].milestones || [];
              const exists = milestones.some(
                (m: any) =>
                  m.title === newMilestone.title &&
                  m.fallig === newMilestone.fallig
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
                name: editedTask.category,
                milestones: [newMilestone],
              });
            }
            SendEmailToUser(
              user.email,
              "Aufgabe aktualisieren",
              `Aktualisierte Mission: ${editedTask.name} (${editedTask.category})`
            );

            return {
              ...user,
              aufgabe: newAufgabe,
              tasks: updatedTasks,
            };
          }
          return user;
        });
    });

    setEditDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskToDelete: Task) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        const taskInUserAufgabe = user.aufgabe?.find(
          (t: any) => t.id === taskToDelete.id
        );
        if (taskInUserAufgabe) {
          const updatedAufgabe = user.aufgabe?.filter(
            (t: any) => t.id !== taskToDelete.id
          );
          let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];
          updatedTasksMilestones = updatedTasksMilestones
            .map((taskCategory: any) => {
              if (taskCategory.milestones) {
                return {
                  ...taskCategory,
                  milestones: taskCategory.milestones.filter(
                    (m: any) => m.id !== taskToDelete.id
                  ),
                };
              }
              return taskCategory;
            })
            .filter(
              (taskCategory: any) =>
                taskCategory.milestones && taskCategory.milestones.length > 0
            );
          SendEmailToUser(
            user.email,
            "Aufgabe lösen",
            `Aufgabe gelöscht: ${taskToDelete.name} (${taskToDelete.category})`
          );

          return {
            ...user,
            aufgabe: updatedAufgabe,
            tasks: updatedTasksMilestones,
          };
        }
        return user;
      })
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
      const catObj = categories.find(
        (c) => c.id.toString() === task.categoryId || c.name === task.category
      );
      const subObj = catObj?.subcategories.find(
        (s) => s.id === task.subcategoryId || s.name === task.subcategory
      );
      const catName = catObj?.name || task.category;
      const subName = subObj?.name || task.subcategory;

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

    const activeCatObj = categories.find((c) => c.name === activeTask.category);
    const activeSubObj = activeCatObj?.subcategories.find(
      (s) => s.name === activeTask.subcategory
    );
    const overCatObj = categories.find((c) => c.name === overTask.category);
    const overSubObj = overCatObj?.subcategories.find(
      (s) => s.name === overTask.subcategory
    );
    const oldCategoryName = activeCatObj?.name || activeTask.category;
    const oldSubcategoryName = activeSubObj?.name || activeTask.subcategory;
    const newCategoryName = overCatObj?.name || overTask.category;
    const newSubcategoryName = overSubObj?.name || overTask.subcategory;

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        const isOwner = user.company?.name === activeTask.firma;

        if (isOwner) {
          const taskIndexInAufgabe = user.aufgabe?.findIndex(
            (t: any) => t.id === active.id
          );

          if (taskIndexInAufgabe !== -1 && user.aufgabe) {
            const updatedAufgabe = [...user.aufgabe];
            const movedTask = { ...updatedAufgabe[taskIndexInAufgabe] };

            if (
              `${oldCategoryName}>${oldSubcategoryName}` ===
              `${newCategoryName}>${newSubcategoryName}`
            ) {
              const groupTasksInUser = updatedAufgabe.filter(
                (t) =>
                  (categories.find(
                    (c) =>
                      c.id.toString() === t.categoryId || c.name === t.category
                  )?.name || t.category) === oldCategoryName &&
                  (categories
                    .flatMap((c) => c.subcategories)
                    .find(
                      (s) =>
                        s.id === t.subcategoryId || s.name === t.subcategory
                    )?.name || t.subcategory) === oldSubcategoryName
              );

              const oldIndexInGroup = groupTasksInUser.findIndex(
                (t: any) => t.id === active.id
              );
              const newIndexInGroup = groupTasksInUser.findIndex(
                (t: any) => t.id === over.id
              );
              const reorderedGroup = arrayMove(
                groupTasksInUser,
                oldIndexInGroup,
                newIndexInGroup
              );
              const otherTasks = updatedAufgabe.filter(
                (t) =>
                  !(
                    (categories.find(
                      (c) =>
                        c.id.toString() === t.categoryId ||
                        c.name === t.category
                    )?.name || t.category) === oldCategoryName &&
                    (categories
                      .flatMap((c) => c.subcategories)
                      .find(
                        (s) =>
                          s.id === t.subcategoryId || s.name === t.subcategory
                      )?.name || t.subcategory) === oldSubcategoryName
                  )
              );
              user.aufgabe = [...otherTasks, ...reorderedGroup];
            } else {
              // category ve subcategory enum/union tipine uygun atanıyor
              if (
                newCategoryName &&
                ["Marketing", "Development", "Design", "Fulfillment"].includes(
                  newCategoryName
                )
              ) {
                movedTask.category =
                  newCategoryName as typeof movedTask.category;
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
              movedTask.categoryId = overCatObj?.id?.toString();
              movedTask.subcategoryId = overSubObj?.id;
              movedTask.status = "Bearbeitung";

              if (
                typeof taskIndexInAufgabe === "number" &&
                taskIndexInAufgabe >= 0
              ) {
                updatedAufgabe.splice(taskIndexInAufgabe, 1);
              }

              updatedAufgabe.push(movedTask);
              user.aufgabe = updatedAufgabe;
            }

            let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];
            updatedTasksMilestones = updatedTasksMilestones
              .map((taskCategory: any) => {
                if (taskCategory.milestones) {
                  return {
                    ...taskCategory,
                    milestones: taskCategory.milestones.filter(
                      (m: any) => m.id !== active.id
                    ),
                  };
                }
                return taskCategory;
              })
              .filter(
                (taskCategory: any) =>
                  taskCategory.milestones && taskCategory.milestones.length > 0
              );

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
              (taskCategory: any) =>
                taskCategory.name === updatedMilestone.category
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

            return {
              ...user,
              aufgabe: user.aufgabe,
              tasks: updatedTasksMilestones,
            };
          }
        }
        return user;
      })
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
