import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { AuthRoutes } from "../../rootes/auth/AuthRoutes";
import { Link } from "react-router-dom";
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Üst Bar */}
      <AppBar position="static" elevation={0} color="default">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            sx={{ borderRadius: 10, textTransform: "none" }}
          >
            <Link to={AuthRoutes.register}>Anmelden</Link>
          </Button>
        </Toolbar>
      </AppBar>

      {/* Ortalanmış İçerik */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom>
            Passwort vergessen
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Gib die deinem Konto zugeordnete E-Mail-Adresse ein. Wir senden dir
            dann einen Link zum Zurücksetzen deines Passworts per E-Mail.
          </Typography>

          <Paper elevation={3} sx={{ p: 3 }}>
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
              sx={{ mt: 2, borderRadius: 4, py: 1.5 }}
            >
              Passwort zurücksetzen
            </Button>
          </Paper>

          <Box mt={3}>
            <Link href="#" variant="body2">
              Ich habe bereits einen Code.
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
