import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BusinessIcon from "@mui/icons-material/Business";
import type { User } from "../type";

type Props = {
  user: User;
  imageUrl?: string;
};

const aufgabengebieteData = [
  { id: 1, title: "Marketing", content: "Details zum Marketing-Aufgabengebiet..." },
  { id: 2, title: "Softwareentwicklung", content: "Details zum Bereich Softwareentwicklung..." },
  // Buraya diğer görev alanları eklenebilir
];

const Details = ({ user, imageUrl }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedAufgabe, setSelectedAufgabe] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setSelectedAufgabe(null); // Tab değişince görev detayları sıfırlanabilir
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Tablara göre gösterilecek içerik
  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <Typography mt={2}>
            {user.name}
          </Typography>
        );
      case 1:
        return (
          <Typography mt={2}>
            {user.company.name}
            {user.company.description}
          </Typography>
        );
      case 2:
        return (
          <Typography mt={2}>
           {user.website}
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
      {/* Oberer Bereich */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={imageUrl || ""}
            sx={{ width: 64, height: 64, bgcolor: "#1976d2" }}
          >
            {!imageUrl && <BusinessIcon />}
          </Avatar>
          <Typography variant="h5">{user.name}</Typography>
        </Box>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem>Bearbeiten</MenuItem>
          <MenuItem disabled>Löschen</MenuItem>
        </Menu>
      </Box>

      {/* Tabs */}
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mt: 3 }}>
        <Tab label="Eckdaten" />
        <Tab label="Unternehmensgegenstand" />
        <Tab label="Vision" />
        <Tab label="Cross-Funktion" />
      </Tabs>

      {/* Tab İçeriği */}
      <Box mt={2} mb={4} px={2}>
        {renderTabContent()}
      </Box>

      {/* Aufgabenbereiche */}
      <Typography variant="h6" mb={2}>
        Aufgabengebiete
      </Typography>
      <Grid container spacing={2} mb={4}>
        {aufgabengebieteData.map((aufgabe) => (
          <Grid item xs={12} sm={6} md={4} key={aufgabe.id}>
            <Card
              onClick={() => setSelectedAufgabe(aufgabe.id)}
              sx={{
                cursor: "pointer",
                border: selectedAufgabe === aufgabe.id ? "2px solid #1976d2" : "1px solid #ccc",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <CardContent>
                <Typography align="center" variant="subtitle1">
                  {aufgabe.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Seçilen görev alanının detayları */}
      {selectedAufgabe && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {aufgabengebieteData.find((a) => a.id === selectedAufgabe)?.title}
          </Typography>
          <Typography>
            {aufgabengebieteData.find((a) => a.id === selectedAufgabe)?.content}
          </Typography>
        </Paper>
      )}

      {/* Meilensteine */}
      <Typography variant="h6" mt={6} mb={2}>
        Meilensteine
      </Typography>
      <List>
        <ListItem>1. Meilenstein – Juli 2025</ListItem>
        <ListItem>2. Meilenstein – August 2025</ListItem>
      </List>
    </Box>
  );
};

export default Details;
