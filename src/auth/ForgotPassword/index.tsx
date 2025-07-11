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
import useStyles from "./styles";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { users } = useUserContext();
  const { classes } = useStyles();

  const handleEdit = () => {
    if (email.trim().length === 0) {
      alert("Bitte Email eingeben");
      return;
    }
    const newUser = users?.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!newUser) alert("👉 „Benutzer nicht gefunden");
    navigate("/login");
  };

  return (
    <Box className={classes.root}>
      <AnmeldungButton />
      <Box className={classes.centerContainer}>
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            Passwort vergessen
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
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
