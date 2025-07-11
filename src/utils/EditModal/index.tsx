import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
} from "@mui/material";

import type { User } from "../../types/User.types";
import Modal from "../Modal/index";
import { useUserContext } from "../../hooks/user/useUserContext";

type EditUserModalProps = {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  onSave: (updatedUser: User) => void;
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState<User | null>(null);
  const { users, setUsers } = useUserContext();
  const [modal, setModal] = useState<boolean>(false);
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (field: keyof User, value: any) => {
    if (!formData) return;
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleCompanyChange = (field: keyof User["company"], value: any) => {
    if (!formData) return;
    setFormData((prev) =>
      prev ? { ...prev, company: { ...prev.company, [field]: value } } : prev
    );
  };

  const handleAddressChange = (field: keyof User["address"], value: any) => {
    if (!formData) return;
    setFormData((prev) =>
      prev ? { ...prev, address: { ...prev.address, [field]: value } } : prev
    );
  };

  const handleSave = () => {
    if (!formData) return;
    if (formData.name.trim() === "") {
      alert("Name darf nicht leer sein.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    const updatedUsers = users.map((u) =>
      u.id === formData.id ? formData : u
    );

    setUsers(updatedUsers);
    onSave(formData);
    onClose();
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Benutzer bearbeiten</DialogTitle>
      <DialogContent>
        <Box display="flex" gap={2} mb={2}>
          <Button onClick={() => setModal(!modal)}>
            <Avatar
              src={formData.imageURL}
              sx={{ width: 64, height: 64 }}
            />{" "}
          </Button>
          <TextField
            label="Profilbild URL"
            fullWidth
            value={formData.imageURL}
            onChange={(e) => handleChange("imageURL", e.target.value)}
          />
        </Box>

        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <TextField
          label="Telefon"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <TextField
          label="Website"
          fullWidth
          margin="normal"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />

        <TextField
          label="Beschreibung"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        {/* Firma */}
        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            Firma
          </Typography>
          <TextField
            label="Firmenname"
            fullWidth
            margin="normal"
            value={formData.company.name}
            onChange={(e) => handleCompanyChange("name", e.target.value)}
          />
        </Box>

        {/* Adresse */}
        <Box mt={4}>
          <Typography variant="subtitle1" gutterBottom>
            Adresse
          </Typography>
          <TextField
            label="Straße"
            fullWidth
            margin="normal"
            value={formData.address.street}
            onChange={(e) => handleAddressChange("street", e.target.value)}
          />
          <TextField
            label="Suite"
            fullWidth
            margin="normal"
            value={formData.address.suite}
            onChange={(e) => handleAddressChange("suite", e.target.value)}
          />
          <TextField
            label="Stadt"
            fullWidth
            margin="normal"
            value={formData.address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
          />
          <TextField
            label="PLZ"
            fullWidth
            margin="normal"
            value={formData.address.zipcode}
            onChange={(e) => handleAddressChange("zipcode", e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button variant="contained" onClick={handleSave}>
          Speichern
        </Button>
      </DialogActions>
      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          initialData={{
            name: formData.company.name,
            imageURL: formData.imageURL,
            id: user?.id,
          }}
          onSave={(updated) => {
            //  formData'yı sofort upgrade
            setFormData((prev) =>
              prev
                ? {
                    ...prev,
                    name: updated.name,
                    company: { ...prev.company, name: updated.name },
                    imageURL: updated.imageURL,
                  }
                : prev
            );
            setModal(false);
          }}
        />
      )}
    </Dialog>
  );
};

export default EditUserModal;
