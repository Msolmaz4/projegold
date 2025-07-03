import React, { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  IconButton, 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { useUser } from "../../context/UserContext"
import type { Aufgabe, User } from "../../types";

const MilestoneOverview: React.FC = () => {
  const { users } = useUser();
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(new Set());
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);

  const handleAddClick = () => setSelectDialogOpen(true);

  const handleUserSelect = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user && !selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers([user, ...selectedUsers]);
    }
    setSelectDialogOpen(false);
  };

  const handleUserDelete = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.id !== userId)
    );
  };

  const toggleUser = (userId: number) => {
    const newSet = new Set(expandedCompanies);
    if (newSet.has(userId)) newSet.delete(userId);
    else newSet.add(userId);
    setExpandedCompanies(newSet);
  };

  const calculateProgress = (aufgabeList: Aufgabe[]) => {
    let total = 0;
    let done = 0;
    let remaining = { vorarbeit: 0, umsetzung: 0, kontrolle: 0 };

    aufgabeList.forEach((task) => {
      const sum = task.vorarbeit + task.umsetzung + task.kontrolle;
      total += sum;
      if (task.status.toLowerCase() === "erledigt") {
        done += sum;
      } else {
        remaining.vorarbeit += task.vorarbeit;
        remaining.umsetzung += task.umsetzung;
        remaining.kontrolle += task.kontrolle;
      }
    });

    const progressPercent = total === 0 ? 0 : (done / total) * 100;
    return { progressPercent, remaining };
  };

  return (
    <Paper sx={{ p: 4, mx: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        MEILENSTEIN
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleAddClick}>
          Hinzufügen
        </Button>
      </Box>

      {selectedUsers.length === 0 && (
        <Typography align="center" color="textSecondary">
          Noch keine Firmen hinzugefügt.
        </Typography>
      )}

      {selectedUsers.map((user) => {
        const { progressPercent, remaining } = calculateProgress(user.aufgabe);

        return (
          <Box
            key={user.id}
            sx={{
              mb: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              cursor: "pointer",
            }}
            onClick={() => toggleUser(user.id)}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 160, display: "flex", alignItems: "center", gap: 1 }}>
                <img src={user.imageURL} alt={user.name} width={30} />
                <Typography fontWeight="bold">{user.company.name}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ width: 50, textAlign: "right" }}>
                <Typography variant="body2">{progressPercent.toFixed(0)}%</Typography>
              </Box>

              <Box
                sx={{
                  width: 60,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="caption" sx={{ textTransform: "lowercase", fontSize: 10, mb: 0.5 }}>
                  vorarbeit
                </Typography>
                <Typography variant="caption">{remaining.vorarbeit}</Typography>
              </Box>

              <Box
                sx={{
                  width: 60,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="caption" sx={{ textTransform: "lowercase", fontSize: 10, mb: 0.5 }}>
                  umsetzung
                </Typography>
                <Typography variant="caption">{remaining.umsetzung}</Typography>
              </Box>

              <Box
                sx={{
                  width: 60,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="caption" sx={{ textTransform: "lowercase", fontSize: 10, mb: 0.5 }}>
                  kontrolle
                </Typography>
                <Typography variant="caption">{remaining.kontrolle}</Typography>
              </Box>

              {/* DELETE */}
              <IconButton
                aria-label="delete"
                onClick={(event) => {
                  event.stopPropagation(); 
                  handleUserDelete(user.id);
                }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>

            <Collapse in={expandedCompanies.has(user.id)}>
              <Box mt={2} pl={4}>
                {user.aufgabe.length === 0 ? (
                  <Typography variant="body2">Keine Aufgaben.</Typography>
                ) : (
                  user.aufgabe.map((task, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        p: 1,
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">{task.name}</Typography>
                      <Typography
                        variant="caption"
                        color={
                          task.status.toLowerCase() === "erledigt"
                            ? "green"
                            : task.status.toLowerCase() === "bearbeitung"
                            ? "orange"
                            : "red"
                        }
                      >
                        {task.status}
                      </Typography>
                    </Box>
                  ))
                )}
              </Box>
            </Collapse>
          </Box>
        );
      })}

      {/* Firma / User AUSSUCHEN */}
      <Dialog open={selectDialogOpen} onClose={() => setSelectDialogOpen(false)}>
        <DialogTitle>Firma auswählen</DialogTitle>
        <DialogContent dividers>
          {users.map((user) => (
            <Box
              key={user.id}
              sx={{
                p: 1,
                mb: 1,
                border: "1px solid #ddd",
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#eee" },
              }}
              onClick={() => handleUserSelect(user.id)}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <img src={user.imageURL} alt={user.name} width={30} />
                <Typography>{user.company.name}</Typography>
              </Stack>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectDialogOpen(false)}>Abbrechen</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default MilestoneOverview;
