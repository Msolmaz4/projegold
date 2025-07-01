import React, { useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Task = {
  id: number;
  name: string;
  vorarbeit: number;
  umsetzung: number;
  kontrolle: number;
  status: "offen" | "erledigt" | "in Bearbeitung";
  milestone: string;
};

type Milestone = {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
};

type Company = {
  id: number;
  name: string;
  logo: string;
  milestones: Milestone[];
};

const companiesData: Company[] = [
  {
    id: 1,
    name: "Formilo",
    logo: "/logos/formilo.png",
    milestones: [
      {
        id: 23,
        name: "Meilenstein 23",
        description: "Traffic verdoppeln",
        tasks: [
          {
            id: 1,
            name: "Backlink setzen",
            vorarbeit: 10,
            umsetzung: 20,
            kontrolle: 10,
            status: "erledigt",
            milestone: "Meilenstein 23",
          },
          {
            id: 2,
            name: "Retargeting starten",
            vorarbeit: 30,
            umsetzung: 40,
            kontrolle: 20,
            status: "offen",
            milestone: "Meilenstein 23",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Goldweiss",
    logo: "/logos/goldweiss.png",
    milestones: [
      {
        id: 23,
        name: "Meilenstein 23",
        description: "Traffic verdoppeln",
        tasks: [
          {
            id: 3,
            name: "SEO Audit",
            vorarbeit: 20,
            umsetzung: 20,
            kontrolle: 10,
            status: "offen",
            milestone: "Meilenstein 23",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Perlit",
    logo: "/logos/perlit.png",
    milestones: [
      {
        id: 23,
        name: "Meilenstein 23",
        description: "Traffic verdoppeln",
        tasks: [
          {
            id: 4,
            name: "Ad Campaign",
            vorarbeit: 10,
            umsetzung: 10,
            kontrolle: 5,
            status: "erledigt",
            milestone: "Meilenstein 23",
          },
        ],
      },
    ],
  },
];

// Görev ilerlemesi hesaplama
const calculateProgress = (tasks: Task[]) => {
  let total = 0;
  let done = 0;
  let remaining = { vorarbeit: 0, umsetzung: 0, kontrolle: 0 };

  tasks.forEach((task) => {
    const sum = task.vorarbeit + task.umsetzung + task.kontrolle;
    total += sum;
    if (task.status === "erledigt") {
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

const MilestoneOverview: React.FC = () => {
  const [milestoneId, setMilestoneId] = useState(23);
  const [expandedCompanies, setExpandedCompanies] = useState<Set<number>>(new Set());
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [selectDialogOpen, setSelectDialogOpen] = useState(false);
  const handleAddClick = () => setSelectDialogOpen(true);
  const handleCompanySelect = (companyId: number) => {
    const company = companiesData.find((c) => c.id === companyId);
    if (company && !selectedCompanies.find((c) => c.id === company.id)) {
      setSelectedCompanies([company, ...selectedCompanies]);
    }
    setSelectDialogOpen(false);
  };

  const toggleCompany = (companyId: number) => {
    const newSet = new Set(expandedCompanies);
    if (newSet.has(companyId)) newSet.delete(companyId);
    else newSet.add(companyId);
    setExpandedCompanies(newSet);
  };

  return (
    <Paper sx={{ p: 4, width: "%100", mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom align="center">
        MEILENSTEIN
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleAddClick}>
          Hinzufügen
        </Button>
      </Box>

      <Box mb={3}>
        <label>
          Meilenstein wählen:&nbsp;
          <select
            value={milestoneId}
            onChange={(e) => {
              setMilestoneId(Number(e.target.value));
              setExpandedCompanies(new Set());
            }}
          >
            {[21, 22, 23].map((id) => (
              <option key={id} value={id}>
                Meilenstein {id}
              </option>
            ))}
          </select>
        </label>
      </Box>

      {selectedCompanies.length === 0 && (
        <Typography align="center" color="textSecondary">
          Noch keine Firmen hinzugefügt.
        </Typography>
      )}

      {selectedCompanies.map((company) => {
        const tasks = company.milestones
          .flatMap((m) => m.tasks)
          .filter((t) => t.milestone === `Meilenstein ${milestoneId}`);

        const { progressPercent, remaining } = calculateProgress(tasks);

        return (
          <Box
            key={company.id}
            sx={{
              mb: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              cursor: "pointer",
            }}
            onClick={() => toggleCompany(company.id)}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 160,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <img src={company.logo} alt={company.name} width={30} />
                <Typography fontWeight="bold">{company.name}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Box sx={{ width: 50, textAlign: "right" }}>
                <Typography variant="body2">
                  {progressPercent.toFixed(0)}%
                </Typography>
              </Box>
              <Box sx={{ width: 60, textAlign: "right" }}>
                <Typography variant="caption">{remaining.vorarbeit}</Typography>
              </Box>
              <Box sx={{ width: 60, textAlign: "right" }}>
                <Typography variant="caption">{remaining.umsetzung}</Typography>
              </Box>
              <Box sx={{ width: 60, textAlign: "right" }}>
                <Typography variant="caption">{remaining.kontrolle}</Typography>
              </Box>
            </Stack>

            <Collapse in={expandedCompanies.has(company.id)}>
              <Box mt={2} pl={4}>
                {tasks.length === 0 ? (
                  <Typography variant="body2">Keine Aufgaben.</Typography>
                ) : (
                  tasks.map((task) => (
                    <Box
                      key={task.id}
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
                          task.status === "erledigt"
                            ? "green"
                            : task.status === "in Bearbeitung"
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

      {/* Firma seçimi */}
      <Dialog
        open={selectDialogOpen}
        onClose={() => setSelectDialogOpen(false)}
      >
        <DialogTitle>Firma auswählen</DialogTitle>
        <DialogContent dividers>
          {companiesData.map((company) => (
            <Box
              key={company.id}
              sx={{
                p: 1,
                mb: 1,
                border: "1px solid #ddd",
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#eee" },
              }}
              onClick={() => handleCompanySelect(company.id)}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <img src={company.logo} alt={company.name} width={30} />
                <Typography>{company.name}</Typography>
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
