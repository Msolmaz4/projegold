import React, { useState } from 'react';
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
  Grid
} from '@mui/material';
import { MoreVert, Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { Categories } from '../../data';
import type { Category } from '../../types';

const initialCategories: Category[] = Categories;

const KategorieListe: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [subDialogOpen, setSubDialogOpen] = useState(false);
  const [newSubName, setNewSubName] = useState('');

  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [subEditName, setSubEditName] = useState('');
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
    if (editId) {
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editId ? { ...cat, name: newName } : cat
        )
      );
    } else {
      setCategories(prev => [
        ...prev,
        { id: uuidv4(), name: newName, subcategories: [] }
      ]);
    }
    setNewName('');
    setDialogOpen(false);
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (cat && cat.subcategories.length > 0) {
      alert("Kategorie kann nicht gelöscht werden – enthält Unterkategorien.");
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== id));
    closeMenu();
  };

  const handleEdit = (id: string) => {
    const cat = categories.find(c => c.id === id);
    if (cat) {
      setEditId(id);
      setNewName(cat.name);
      setDialogOpen(true);
    }
    closeMenu();
  };

  const handleAddSub = () => {
    if (!newSubName.trim() || !selectedCatId) return;
    const selectedCat = categories.find(cat => cat.id === selectedCatId);
    if (selectedCat && selectedCat.subcategories.length >= 5) {
      alert('Maximal 5 Aufgaben pro Kategorie erlaubt');
      return;
    }
    setCategories(prev =>
      prev.map(cat =>
        cat.id === selectedCatId
          ? {
              ...cat,
              subcategories: [...cat.subcategories, { id: uuidv4(), name: newSubName.trim() }]
            }
          : cat
      )
    );
    setNewSubName('');
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

    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        subcategories: cat.subcategories.map(sub =>
          sub.id === selectedSubId ? { ...sub, name: subEditName } : sub
        )
      }))
    );

    setSubEditDialogOpen(false);
    setSelectedSubId(null);
    setSubEditName('');
  };

  const handleDeleteSub = () => {
    if (!selectedSubId) return;

    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        subcategories: cat.subcategories.filter(sub => sub.id !== selectedSubId)
      }))
    );

    setSubEditDialogOpen(false);
    setSelectedSubId(null);
    setSubEditName('');
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<Add />} onClick={() => setDialogOpen(true)}>
          Hinzufügen
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categories.map(cat => (
          <Grid item xs={12} md={6} lg={4} key={cat.id}>
            <Card>
              <CardHeader
                title={<Typography variant="h6">📁 {cat.name}</Typography>}
                action={
                  <>
                    <IconButton onClick={(e) => openMenu(e, cat.id)}>
                      <MoreVert />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={menuId === cat.id} onClose={closeMenu}>
                      <MenuItem onClick={() => handleEdit(cat.id)}>Bearbeiten</MenuItem>
                      <MenuItem onClick={() => handleDelete(cat.id)}>Löschen</MenuItem>
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
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        }
                      }}
                      onClick={() => handleOpenSubEditDialog(sub.id, sub.name)}
                    >
                      <ListItemText
                        primary={`• ${sub.name}`}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          sx: {
                            '&:hover': {
                              fontWeight: 700,
                              textDecoration: 'underline'
                            }
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => {
                      setSelectedCatId(cat.id);
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

      {/* Kategorie Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>{editId ? "Kategorie bearbeiten" : "Neue Kategorie hinzufügen"}</DialogTitle>
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
      <Dialog open={subDialogOpen} onClose={() => setSubDialogOpen(false)} fullWidth>
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
      <Dialog open={subEditDialogOpen} onClose={() => setSubEditDialogOpen(false)} fullWidth>
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
