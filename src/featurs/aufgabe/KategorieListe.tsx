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
  
} from '@mui/material';
import { MoreVert, Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import Grid from "@mui/material/Grid";
import type { Category } from '../../types';




const initialCategories: Category[] = [
  {
    id: "marketing",
    name: "Marketing",
    subcategories: [
      { id: "seo", name: "SEO" },
      { id: "google_ads", name: "Google Ads" },
      { id: "social_media", name: "Social Media" },
    ],
  },
  {
    id: "vertrieb",
    name: "Vertrieb",
    subcategories: [
      { id: "cold_calls", name: "Cold Calls" },
      { id: "cold_mails", name: "Cold Mails" },
      { id: "lead_setting", name: "Leadqualifizierung / Setting" },
    ],
  },
  {
    id: "fulfillment",
    name: "Fulfillment",
    subcategories: [
      { id: "pf_design", name: "PF Design" },
      { id: "pdf_programmierung", name: "PDF Programmierung" },
      { id: "webformula", name: "Webformula" },
    ],
  },
];

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
                  {cat.subcategories.map((sub, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={`• ${sub.name}`} />
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

      {/* Unterkategorie Dialog */}
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
    </Box>
  );
};

export default KategorieListe;

