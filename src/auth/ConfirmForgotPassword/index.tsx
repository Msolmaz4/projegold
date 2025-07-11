import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Container,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import LinkIcon from "@mui/icons-material/Link";
import AnmeldungButton from "../../core/button/AnmeldungButton";
import { AuthRoutes } from "../../rootes";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { useUserContext } from "../../hooks/user/useUserContext";
import { useState } from "react";
import CryptoJS from "crypto-js";

function ResetPassword() {
  const { classes } = useStyles();
  const { users, setUsers } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
    password: "",
    widerholenpassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.code !== "123") {
      alert("Falscher Code eingegeben.");
      return;
    }

    // Benutzer per E-Mail finden
    const userIndex = users.findIndex((u: any) => u.email === formData.email);
    if (userIndex === -1) {
      alert("Diese E-Mail-Adresse ist nicht registriert.");
      return;
    }

    if (formData.password !== formData.widerholenpassword) {
      alert("Die Passwörter stimmen nicht überein.");
      return;
    }

    // Passwort mit CryptoJS verschlüsseln
    const encryptedPassword = CryptoJS.SHA256(formData.password).toString();

    // Neue Kopie der Benutzerliste anlegen und Passwort aktualisieren
    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: encryptedPassword,
    };

    // State aktualisieren
    setUsers(updatedUsers);

    alert("Passwort wurde erfolgreich aktualisiert.");
    navigate("/login");
  };

  return (
    <Box className={classes.root}>
      <AnmeldungButton />

      <Container maxWidth="sm" className={classes.formContainer}>
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Passwort ändern
          </Typography>

          <Stack direction="row" className={classes.iconStack}>
            <Box className={classes.iconBox}>
              <MailOutlineIcon fontSize="large" />
              <Typography variant="caption">Postfach prüfen</Typography>
            </Box>
            <Box className={classes.iconBox}>
              <MarkEmailReadIcon fontSize="large" />
              <Typography variant="caption">E-Mail öffnen</Typography>
            </Box>
            <Box className={classes.iconBox}>
              <LinkIcon fontSize="large" />
              <Typography variant="caption">Link in E-Mail klicken</Typography>
            </Box>
          </Stack>

          <Typography className={classes.infoText}>
            Wir haben dir eine E-Mail mit einem Code geschickt. <br />
            Bitte klicke diesen, um dein Passwort zurückzusetzen.
          </Typography>

          <Typography className={classes.secondaryText}>
            E-Mail nicht erhalten?
          </Typography>
          <Typography fontSize={14}>
            Es kann passieren, dass Dein E-Mail Provider dieses E-Mail als Spam
            angesehen hat. Überprüfe dann bitte Deinen Spam- bzw.
            Junk-E-Mail-Ordner auf Erhalt unserer Nachricht.
          </Typography>

          <Box
            component="form"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="E-Mail-Adresse"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Passwort"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Passwort wiederholen"
                type="password"
                value={formData.widerholenpassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    widerholenpassword: e.target.value,
                  })
                }
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Passwort ändern
              </Button>
              <Link to={AuthRoutes.forgotPassword} className={classes.link}>
                Code erneut senden
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPassword;
