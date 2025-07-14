import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BusinessIcon from "@mui/icons-material/Business";
import type { User } from "types";
import dayjs from "dayjs";
import "dayjs/locale/de";

import useStyles from "./styles";
import EditUserModal from "utils/EditModal";

dayjs.locale("de");

type Props = {
  user: User;
  imageUrl?: string;
  onDelete: (userId: number) => void;
  onUpdate?: (updatedUser: User) => void;
};

const Details = ({ user, imageUrl, onDelete, onUpdate }: Props) => {
  const { classes } = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedAufgabe, setSelectedAufgabe] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setSelectedAufgabe(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(user.id);
    handleMenuClose();
  };

  const filteredTasks =
    user.tasks?.filter(
      (task) => task.name.trim() !== "" && task.milestones.length > 0
    ) ?? [];

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <Typography mt={2}>
            {user.company?.name ?? "Keine Unternehmensdaten"}
          </Typography>
        );
      case 1:
        return (
          <Typography mt={2}>
            {user.company?.description ?? "Keine Beschreibung verfügbar"}
          </Typography>
        );
      case 2:
        return (
          <Typography mt={2}>
            {user.website ?? "Keine Webseite verfügbar"}
          </Typography>
        );
      case 3:
        return (
          <Typography mt={2}>
            Informationen zur Cross-Funktion zwischen den Gesellschaften...
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Box mt={4} borderTop="1px solid #ddd" pt={4}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={imageUrl || ""} className={classes.avatar}>
            {!imageUrl && <BusinessIcon />}
          </Avatar>
          <Typography variant="h5">
            {user.company?.name ?? "Kein Name"}
          </Typography>
        </Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              setEditedUser(user);
              setEditOpen(true);
              handleMenuClose();
            }}
          >
            Bearbeiten
          </MenuItem>
          <MenuItem disabled={filteredTasks.length > 0} onClick={handleDelete}>
            Löschen
          </MenuItem>
        </Menu>
      </Box>

      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mt: 3 }}>
        <Tab label="Eckdaten" />
        <Tab label="Unternehmensgegenstand" />
        <Tab label="Vision" />
        <Tab label="Cross-Funktion" />
      </Tabs>

      {/* Tab Content */}
      <Box mt={2} mb={4} px={2}>
        {renderTabContent()}
      </Box>

      {/* Aufgabenbereiche */}
      {filteredTasks.length > 0 && (
        <>
          <Typography variant="h6" mb={2}>
            Aufgabengebiete
          </Typography>
          <Grid container spacing={2} mb={4}>
            {filteredTasks.map((aufgabe, index) => (
              <Grid size={{ xs: 12, md: 4, sm: 6 }} key={index}>
                <Card
                  onClick={() => setSelectedAufgabe(index)}
                  className={
                    selectedAufgabe === index
                      ? classes.selectedCard
                      : classes.unselectedCard
                  }
                >
                  <CardContent>
                    <Typography align="center" variant="subtitle1">
                      {aufgabe.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Aufgabenbereich Details mit Meilensteinen */}
      {selectedAufgabe !== null && filteredTasks[selectedAufgabe] && (
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            📍 Meilensteine
          </Typography>
          {filteredTasks[selectedAufgabe].milestones.map(
            (milestone: any, idx: number) => {
              const today = dayjs();
              const date = dayjs(milestone.fallig ?? milestone.date);
              let icon = "🚀";
              let color = "#607d8b";

              if (date.isValid()) {
                if (date.isBefore(today, "day")) {
                  icon = "✔";
                  color = "#d32f2f";
                } else if (date.isSame(today, "day")) {
                  icon = "🚧";
                  color = "#f57c00";
                }
              }
              const isErledigt = milestone.status === "erledigt";
              const displayText = milestone.title?.trim()
                ? milestone.title
                : "";
              return (
                <Typography
                  key={idx}
                  variant="body1"
                  className={classes.milestoneText}
                  sx={{ color }}
                >
                  {icon}{" "}
                  <span
                    style={{
                      textDecoration: isErledigt ? "line-through" : "none",
                      textDecorationColor: isErledigt ? color : undefined,
                      textDecorationThickness: isErledigt ? "2px" : undefined,
                      textDecorationStyle: isErledigt ? "solid" : undefined,
                    }}
                  >
                    {displayText}
                    {date.isValid() ? ` – ${date.format("DD.MM.YYYY")}` : ""}
                  </span>
                </Typography>
              );
            }
          )}
        </Paper>
      )}

      {/* EditUserModal */}
      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={editedUser}
        onSave={(updatedUser) => {
          setEditOpen(false);
          if (onUpdate) {
            onUpdate(updatedUser);
          }
        }}
      />
    </Box>
  );
};

export default Details;
