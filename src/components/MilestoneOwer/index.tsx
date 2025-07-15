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
import type { Aufgabe, User } from "types";
import useStyles from "./styles";
import { useAuthContext, useUserContext } from "hooks";

const MilestoneOverview: React.FC = () => {
  const { users } = useUserContext();
  const { userData } = useAuthContext();
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(
    new Set()
  );
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const { classes } = useStyles();
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
      const sum = task.vorarbeit! + task.umsetzung! + task.kontrolle!;

      total += sum;
      if (task.status?.toLowerCase() === "erledigt") {
        done += sum;
      } else {
        remaining.vorarbeit += task.vorarbeit ?? 0;
        remaining.umsetzung += task.umsetzung ?? 0;
        remaining.kontrolle += task.kontrolle ?? 0;
      }
    });

    const progressPercent = total === 0 ? 0 : (done / total) * 100;
    return { progressPercent, remaining };
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        MEILENSTEIN
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        {userData?.admin && (
          <Button variant="contained" onClick={handleAddClick}>
            Hinzufügen
          </Button>
        )}
      </Box>

      {selectedUsers.length === 0 && (
        <Typography align="center" color="textSecondary">
          Noch keine Firmen hinzugefügt.
        </Typography>
      )}

      {selectedUsers.map((user) => {
        const { progressPercent, remaining } = calculateProgress(
          user.aufgabe ?? []
        );

        return (
          <Box
            key={user.id}
            className={classes.companyBox}
            onClick={() => toggleUser(user.id)}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box className={classes.companyHeader}>
                <img
                  src={user.imageURL}
                  alt={user.name}
                  className={classes.avatar}
                />

                <Typography fontWeight="bold">{user.company.name}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  className={classes.progressBar}
                />
              </Box>
              <Box className={classes.progressText}>
                <Typography variant="body2">
                  {progressPercent.toFixed(0)}%
                </Typography>
              </Box>

              {(["vorarbeit", "umsetzung", "kontrolle"] as const).map((key) => (
                <Box key={key} className={classes.remainingBox}>
                  <Typography
                    className={classes.remainingCaption}
                    variant="caption"
                  >
                    {key}
                  </Typography>
                  <Typography variant="caption">{remaining[key]}</Typography>
                </Box>
              ))}

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
                {user.aufgabe?.length === 0 ? (
                  <Typography variant="body2">Keine Aufgaben.</Typography>
                ) : (
                  user.aufgabe?.map((task, idx) => (
                    <Box key={idx} className={classes.taskBox}>
                      <Typography variant="body2">{task.name}</Typography>
                      <Typography
                        variant="caption"
                        color={
                          task.status?.toLowerCase() === "erledigt"
                            ? "green"
                            : task.status?.toLowerCase() === "bearbeitung"
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
      <Dialog
        open={selectDialogOpen}
        onClose={() => setSelectDialogOpen(false)}
      >
        <DialogTitle>Firma auswählen</DialogTitle>
        <DialogContent dividers>
          {users.map((user) => (
            <Box
              key={user.id}
              className={classes.userSelectBox}
              onClick={() => handleUserSelect(user.id)}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <img
                  src={user.imageURL}
                  alt={user.name}
                  className={classes.avatar}
                />

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
