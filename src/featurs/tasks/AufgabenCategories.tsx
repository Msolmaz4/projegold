import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BusinessIcon from "@mui/icons-material/Business";
import { useState } from "react";

type Task = {
  name: string;
  milestones: string[];
};

type User = {
  name: string;
  description: string;
  image?: string;
  tasks: Task[];
};

type Props = {
  user: User;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const AufgabenCategories = ({
  user,
  onAdd,
  onEdit,
  onDelete,
  
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const canDelete = user?.tasks?.length === 0;

  return (
    <Box p={3} border="1px solid #ddd" borderRadius={2} position="relative">
      {/* Hinzufügen Button oben sağda */}
      <Box position="absolute" top={16} right={16}>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Hinzufügen
        </Button>
      </Box>

      {/* Logo ve İsim */}
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Avatar
          src={user?.image || ""}
          sx={{ width: 64, height: 64, bgcolor: "#1976d2" }}
        >
          {!user?.image && <BusinessIcon />}
        </Avatar>
        <Typography variant="h5">{user?.name}</Typography>

        {/* 3 Nokta Menü */}
        <Box ml="auto">
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
                handleMenuClose();
                onEdit();
              }}
            >
              Bearbeiten
            </MenuItem>
            <MenuItem
              disabled={!canDelete}
              onClick={() => {
                if (canDelete) {
                  handleMenuClose();
                  onDelete();
                }
              }}
            >
              Löschen
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Açıklama */}
      <Typography variant="body1" mb={3}>
        {user?.description}
      </Typography>

      {/* Görev Alt Alanları */}
      <Typography variant="h6" gutterBottom>
        Aufgabengebiete
      </Typography>
      <Grid container spacing={2} mb={3}>
        {user?.tasks?.length === 0 && (
          <Typography variant="body2" color="text.secondary" pl={2}>
            Keine Aufgabenuntergebiete vorhanden.
          </Typography>
        )}
        {user?.tasks?.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                cursor: "default",
                py: 2,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">{task.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Meilensteine */}
      <Typography variant="h6" gutterBottom>
        Meilensteine
      </Typography>
      {user?.tasks?.length === 0 && (
        <Typography variant="body2" color="text.secondary" pl={2} mb={2}>
          Keine Meilensteine vorhanden.
        </Typography>
      )}
      {user?.tasks?.map((task, index) => (
        <Box key={index} mb={2}>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            {task.name}
          </Typography>
          <List dense>
            {task.milestones.length === 0 && (
              <ListItem>
                <ListItemText primary="Keine Meilensteine" />
              </ListItem>
            )}
            {task.milestones.map((mile, i) => (
              <ListItem key={i} sx={{ pl: 2 }}>
                <ListItemText primary={mile} />
              </ListItem>
            ))}
          </List>
          {index !== user.tasks.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default AufgabenCategories;
