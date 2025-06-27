import React, { useState } from "react";
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
    TextField,
    Select,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import {  initialTasks } from  '../../data';





function SortableRow({ task }: { task: Task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style} hover {...attributes} {...listeners}>
            <TableCell
                sx={{
                    width: 300,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    paddingRight: 1,
                }}
            >
                {task.name}
            </TableCell>
            <TableCell sx={{ width: 80, paddingRight: 1 }}>{task.vorarbeit} min</TableCell>
            <TableCell sx={{ width: 80, paddingRight: 1 }}>{task.umsetzung} min</TableCell>
            <TableCell sx={{ width: 80, paddingRight: 1 }}>{task.kontrolle} min</TableCell>
            <TableCell sx={{ width: 80, paddingRight: 1 }}>{task.kosten} €</TableCell>
            <TableCell sx={{ width: 110, paddingRight: 1 }}>
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString("de-DE") : "—"}
            </TableCell>
            <TableCell sx={{ width: 110, paddingRight: 1 }}>
                <Chip
                    size="small"
                    label={task.status}
                    color={
                        task.status === "offen"
                            ? "warning"
                            : task.status === "erledigt"
                                ? "success"
                                : task.status === "geplant"
                                    ? "error"
                                    : "info"
                    }
                />
            </TableCell>
            <TableCell sx={{ width: 110, paddingRight: 1 }}>{task.milestone || "—"}</TableCell>
            <TableCell align="right" sx={{ width: 110 }}>
                <IconButton size="small">
                    <EditIcon />
                </IconButton>
                <IconButton size="small">
                    <MoreVertIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

const TaskTable: React.FC = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [openDialog, setOpenDialog] = useState(false);
    const [firmaFilter, setFirmaFilter] = useState("");

    const handleAddTask = (newTask: Task) => {
        setTasks((prev) => [...prev, { ...newTask, id: prev.length + 1 }]);
    };

    const filteredTasks = tasks.filter(
        (task :any) =>
            task?.name.toLowerCase().includes(search.toLowerCase()) &&
            (statusFilter ? task.status === statusFilter : true) &&
            (firmaFilter ? task.firma === firmaFilter : true)
    );

    const grouped = filteredTasks.reduce((acc, task) => {
        const key = `${task.category} > ${task.subcategory}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(task);
        return acc;
    }, {} as Record<string, Task[]>);

    const onDragEnd = ({ active, over }: any) => {
        if (!over || active.id === over.id) return;

        const activeTask = tasks.find((t) => t.id === active.id);
        const overTask = tasks.find((t) => t.id === over.id);

        if (!activeTask || !overTask) return;

        const oldGroup = `${activeTask.category} > ${activeTask.subcategory}`;
        const newGroup = `${overTask.category} > ${overTask.subcategory}`;

        let updatedTasks = [...tasks];

        if (oldGroup === newGroup) {
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
            const [newCategory, newSubcategory] = newGroup.split(" > ");

            updatedTasks = updatedTasks.map((t) => {
                if (t.id === active.id) {
                    return {
                        ...t,
                        category: newCategory,
                        subcategory: newSubcategory,
                        status: "in Bearbeitung",
                    };
                }
                return t;
            });
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
                        <MenuItem value="Firma A">Firma A</MenuItem>
                        <MenuItem value="Firma B">Firma B</MenuItem>
                        <MenuItem value="Firma C">Firma C</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Suche Aufgaben nach..."
                    type="text"
                    variant="outlined"
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

            <AddTaskModal open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleAddTask} />

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
                                        <TableCell>Aufgabe</TableCell>
                                        <TableCell>Vorarbeit</TableCell>
                                        <TableCell>Umsetzung</TableCell>
                                        <TableCell>Kontrolle</TableCell>
                                        <TableCell>Kosten</TableCell>
                                        <TableCell>Fällig am</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Meilenstein</TableCell>
                                        <TableCell align="right">Aktionen</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <SortableContext items={groupTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                                        {groupTasks.map((task) => (
                                            <SortableRow key={task.id} task={task} />
                                        ))}
                                    </SortableContext>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))}
            </DndContext>
        </Box>
    );
};

export default TaskTable;
