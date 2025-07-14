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
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task } from "types";
import { useUserContext, useAuthContext } from "hooks";
import { ConvertTaskToAufgabe, SendEmailToUser, SortableRow } from "core";
import AddTaskModal from "./AdTaskModal";

const extractTasksFromUsers = (users: any[]): Task[] => {
  let idCounter = 1;
  return users
    ?.flatMap(
      (user) =>
        user?.aufgabe?.map((task: any) => ({
          ...task,
          id: task.id || `task-${idCounter++}`,
          email: user.email,
        })) || []
    )
    .filter((task) => task !== null);
};

const TaskTable: React.FC = () => {
  const { categories, users, setUsers } = useUserContext();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [firmaFilter, setFirmaFilter] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { userData } = useAuthContext();
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
          const newTaskId = newTask.id || new Date().getTime();
          const newAufgabe = user.aufgabe ? [...user.aufgabe] : [];
          // Task'i Aufgabe'ye dönüştür ve id ata
          const aufgabeToAdd = ConvertTaskToAufgabe({
            ...newTask,
            id: newTaskId,
          });

          newAufgabe.push(aufgabeToAdd);
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
      let taskMoved = false;
      const updatedUsers = prevUsers.map((user) => {
        const taskInUserAufgabe = user.aufgabe?.find(
          (t: any) => t.id === editedTask.id
        );

        if (taskInUserAufgabe && taskInUserAufgabe.firma === editedTask.firma) {
          const updatedAufgabe = user.aufgabe?.map((t: any) =>
            t.id === editedTask.id ? editedTask : t
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

          const categoryIndex = updatedTasksMilestones.findIndex(
            (taskCategory: any) => taskCategory.name === editedTask.category
          );

          if (categoryIndex !== -1) {
            updatedTasksMilestones[categoryIndex] = {
              ...updatedTasksMilestones[categoryIndex],
              milestones: [
                ...updatedTasksMilestones[categoryIndex].milestones,
                newMilestone,
              ],
            };
          } else {
            updatedTasksMilestones.push({
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
            aufgabe: updatedAufgabe,
            tasks: updatedTasksMilestones,
          };
        }
        // wenn Task User Firma verandet hat ,hat alteUser weg

        if (taskInUserAufgabe && taskInUserAufgabe.firma !== editedTask.firma) {
          taskMoved = true;
          const updatedAufgabe = user.aufgabe?.filter(
            (t: any) => t.id !== editedTask.id
          );
          const updatedTasksMilestones = (user.tasks || [])
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
      });

      // Task umziehen , new User wird Task hinzufugen
      if (taskMoved) {
        const targetIndex = updatedUsers.findIndex(
          (u) => u.company?.name === editedTask.firma
        );
        if (targetIndex !== -1) {
          const user = updatedUsers[targetIndex];
          const updatedAufgabe = [...(user.aufgabe || []), editedTask];

          let updatedTasksMilestones = user.tasks ? [...user.tasks] : [];

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

          const categoryIndex = updatedTasksMilestones.findIndex(
            (taskCategory: any) => taskCategory.name === editedTask.category
          );

          if (categoryIndex !== -1) {
            updatedTasksMilestones[categoryIndex] = {
              ...updatedTasksMilestones[categoryIndex],
              milestones: [
                ...updatedTasksMilestones[categoryIndex].milestones,
                newMilestone,
              ],
            };
          } else {
            updatedTasksMilestones.push({
              name: editedTask.category,
              milestones: [newMilestone],
            });
          }

          SendEmailToUser(
            user.email,
            "Neue Aufgabe zugewiesen",
            `Neue Aufgabe: ${editedTask.name} (${editedTask.category})`
          );

          updatedUsers[targetIndex] = {
            ...user,
            aufgabe: updatedAufgabe,
            tasks: updatedTasksMilestones,
          };
        }
      }

      return updatedUsers;
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
              movedTask.category = newCategoryName;
              movedTask.subcategory = newSubcategoryName;
              movedTask.categoryId = overCatObj?.id.toString();
              movedTask.subcategoryId = overSubObj?.id;
              movedTask.status = "in Bearbeitung";

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
              const newId = new Date().getTime().toString();
              updatedTasksMilestones.push({
                id: newId,
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

        {userData?.admin && (
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            + Aufgabe hinzufügen
          </Button>
        )}
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
