
import React, { useState, useEffect, useCallback, use } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Modal as MuiModal,
  Backdrop,
  Fade,
} from "@mui/material";

import type { User } from "../types";
import { useUser } from "../context/UserContext";



type UpModalProps = {
  user: User | null;  // düzenlenecek kullanıcı, yoksa null
  open: boolean;
  onClose: () => void;

};

const UpModal: React.FC<UpModalProps> = ({


  user,
  open,
  onClose


}) => {


  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { deleteUser, upgrdateUser } = useUser();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(null);
      if (typeof user.image === "string") {
        setPreview(user.image);
      } else {
        setPreview(null);
      }
    }
  }, [user]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleUpdate = () => {
    if (!user) return;
   // console.log(name, image, user.id,'UPLOAD');
    upgrdateUser({ id: user.id, name, image });
    onClose();
  };

  const handleDelete = () => {
    if (!user) return;
    deleteUser(user.id);

    onClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
            width: 500,
            maxWidth: "90%",
          }}
        >
          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Paper
            variant="outlined"
            sx={{
              mt: 2,
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderStyle: "dashed",
              bgcolor: isDragActive ? "#f0f0f0" : "#fafafa",
              cursor: "pointer",
              textAlign: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                {isDragActive
                  ? "Drop the image here ..."
                  : "Drag & drop an image, or click to select one"}
              </Typography>
            )}
          </Paper>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={onClose}>
                Brechen
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Upgrade
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default UpModal;
