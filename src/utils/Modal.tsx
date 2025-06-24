import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  Modal as MuiModal,
  Backdrop,
  Fade,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (data: { name: string; image: File | null ,id:number}) => void;
}

const Modal: React.FC<ModalProps> = ({ open, onSave, onClose }) => {
  console.log(open);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  const handleSave = () => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    console.log(id)
    const name = text;
    if (onSave) onSave({ name, image,id});

    onClose();
    setText("");
    setImage(null);
    setPreview(null);
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
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
            label="Geben Sie den Firmennamen ein"
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
                alt="Yüklenen"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                {isDragActive
                  ? "Lass es los 🫴"
                  : "Bild per Drag & Drop oder Klick hochladen"}
              </Typography>
            )}
          </Paper>

          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button variant="outlined" onClick={onClose}>
              Abbrechen
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Speichern
            </Button>
          </Box>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
