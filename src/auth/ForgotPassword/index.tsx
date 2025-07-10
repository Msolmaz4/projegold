import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AuthRoutes } from "../../rootes/auth/AuthRoutes";
import { Link, useNavigate } from "react-router-dom";
import AnmeldungButton from "../../core/button/AnmeldungButton";
import { useUserContext } from "../../hooks/user/useUserContext";
import useStyles from "./styles"; // <--- STYLES BURADA

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { users } = useUserContext();
  const { classes } = useStyles(); // <-- KULLANIM

  const handleEdit = () => {
    if (email.trim().length === 0) {
      alert("Bitte Email eingeben");
      return;
    }
    const newUser = users?.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!newUser) alert("👉 Benutzer nicht gefunden");
    navigate("/login");
  };

  return (
    <Box className={classes.root}>
      <AnmeldungButton />
      <Box className={classes.wrapper}>
        <Container maxWidth="sm" className={classes.container}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Passwort vergessen
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            Gib die deinem Konto zugeordnete E-Mail-Adresse ein. Wir senden dir
            dann einen Link zum Zurücksetzen deines Passworts per E-Mail.
          </Typography>

          <Paper elevation={3} className={classes.paper}>
            <TextField
              fullWidth
              label="E-Mail-Adresse"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              className={classes.textField}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleEdit}
            >
              Passwort zurücksetzen
            </Button>
          </Paper>

          <Box className={classes.linkBox}>
            <Link to={AuthRoutes.confirmForgotPassword}>
              Ich habe bereits einen Code.
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
