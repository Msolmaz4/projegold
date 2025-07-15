import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { MoreVert, Add } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import type { Category } from "types";
import { useUserContext } from "hooks";
import { useAuthContext } from "hooks";
import useStyles from "./styles";

const KategorieListe: React.FC = () => {
  const { classes } = useStyles();
  const { categories, setCategories } = useUserContext();
  const { userData } = useAuthContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [subDialogOpen, setSubDialogOpen] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [subEditName, setSubEditName] = useState("");
  const [subEditDialogOpen, setSubEditDialogOpen] = useState(false);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setMenuId(id);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleSaveCategory = () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      alert("Name darf nicht leer sein");
      return;
    }
    if (trimmedName.length > 20) {
      alert("Max 20 Karakter");
      return;
    }

    if (
      !editId &&
      categories.some(
        (cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      alert("Dieser Name wurde bereits gespeichert");
      return;
    }

    if (
      editId &&
      categories.some(
        (cat) =>
          cat.name.toLowerCase() === trimmedName.toLowerCase() &&
          cat.id !== editId
      )
    ) {
      alert("Dieser Name wurde bereits gespeichert");
      return;
    }

    if (editId) {
      const updated = categories.map((cat) =>
        cat.id === editId ? { ...cat, name: trimmedName } : cat
      );
      setCategories(updated);
    } else {
      const newCategory: Category = {
        id: uuidv4(),
        name: trimmedName,
        subcategories: [],
      };
      setCategories([...categories, newCategory]);
    }
    setNewName("");
    setDialogOpen(false);
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (cat && cat.subcategories.length > 0) {
      alert("Kategorie kann nicht gelöscht werden – enthält Unterkategorien.");
      return;
    }
    setCategories(categories.filter((c) => c.id !== id));
    closeMenu();
  };

  const handleEdit = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (cat) {
      setEditId(id);
      setNewName(cat.name);
      setDialogOpen(true);
    }
    closeMenu();
  };

  const handleAddSub = () => {
    if (!newSubName.trim() || !selectedCatId) return;

    const selectedCat = categories.find((cat) => cat.id === selectedCatId);
    if (selectedCat && selectedCat.subcategories.length >= 5) {
      alert("Maximal 5 Aufgaben pro Kategorie erlaubt");
      return;
    }

    const updated = categories.map((cat) =>
      cat.id === selectedCatId
        ? {
            ...cat,
            subcategories: [
              ...cat.subcategories,
              { id: uuidv4(), name: newSubName.trim() },
            ],
          }
        : cat
    );
    setCategories(updated);
    setNewSubName("");
    setSelectedCatId(null);
    setSubDialogOpen(false);
  };

  const handleOpenSubEditDialog = (subId: string, name: string) => {
    setSelectedSubId(subId);
    setSubEditName(name);
    setSubEditDialogOpen(true);
  };

  const handleSaveSubEdit = () => {
    if (!selectedSubId) return;

    const updated = categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories.map((sub) =>
        sub.id === selectedSubId ? { ...sub, name: subEditName } : sub
      ),
    }));
    setCategories(updated);
    setSubEditDialogOpen(false);
    setSelectedSubId(null);
    setSubEditName("");
  };

  const handleDeleteSub = () => {
    if (!selectedSubId) return;

    const updated = categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories.filter(
        (sub) => sub.id !== selectedSubId
      ),
    }));
    setCategories(updated);
    setSubEditDialogOpen(false);
    setSelectedSubId(null);
    setSubEditName("");
  };

  if (!categories) {
    return <Typography>Lädt Kategorien...</Typography>;
  }

  return (
    <Box className={classes.rootBox}>
      <Box className={classes.addButtonContainer}>
        {userData?.admin && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDialogOpen(true)}
          >
            Hinzufügen
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {categories.length === 0 && (
          <Typography className={classes.noCategoriesText}>
            Keine Kategorien vorhanden.
          </Typography>
        )}

        <Grid container spacing={{ xs: 12, md: 6, lg: 4 }}>
          {categories.map((cat) => (
            <Grid key={cat.id}>
              <Card>
                <CardHeader
                  title={
                    <Typography className={classes.cardHeaderTitle}>
                      s 📁 {cat.name}
                    </Typography>
                  }
                  action={
                    <>
                      <IconButton
                        onClick={(e) => openMenu(e, cat.id.toString())}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={menuId === cat.id}
                        onClose={closeMenu}
                      >
                        <MenuItem onClick={() => handleEdit(cat.id.toString())}>
                          Bearbeiten
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDelete(cat.id.toString())}
                        >
                          Löschen
                        </MenuItem>
                      </Menu>
                    </>
                  }
                />
                <CardContent>
                  <Typography fontWeight="bold" mb={1}>
                    Unterkategorien:
                  </Typography>
                  <List dense>
                    {cat.subcategories.map((sub) => (
                      <ListItem
                        key={sub.id}
                        className={classes.listItem}
                        onClick={() =>
                          handleOpenSubEditDialog(sub.id.toString(), sub.name)
                        }
                      >
                        <ListItemText
                          primary={`• ${sub.name}`}
                          primaryTypographyProps={{
                            className: classes.listItemText,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box className={classes.addSubButton}>
                    <Button
                      size="small"
                      startIcon={<Add />}
                      onClick={() => {
                        setSelectedCatId(cat.id.toString());
                        setSubDialogOpen(true);
                      }}
                    >
                      Unterkategorie hinzufügen
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Kategorie Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>
          {editId ? "Kategorie bearbeiten" : "Neue Kategorie hinzufügen"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button onClick={handleSaveCategory} variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unterkategorie hinzufügen */}
      <Dialog
        open={subDialogOpen}
        onClose={() => setSubDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Unterkategorie hinzufügen</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Name der Unterkategorie"
            fullWidth
            value={newSubName}
            onChange={(e) => setNewSubName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubDialogOpen(false)}>Abbrechen</Button>
          <Button onClick={handleAddSub} variant="contained">
            Hinzufügen
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unterkategorie bearbeiten/löschen */}
      <Dialog
        open={subEditDialogOpen}
        onClose={() => setSubEditDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Unterkategorie bearbeiten</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Name"
            value={subEditName}
            onChange={(e) => setSubEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteSub} color="error">
            Löschen
          </Button>
          <Button onClick={() => setSubEditDialogOpen(false)}>Abbrechen</Button>
          <Button onClick={handleSaveSubEdit} variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KategorieListe;
