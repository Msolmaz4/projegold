import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Task } from "types";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const SortableRow = ({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => {
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
};

export default SortableRow;
