import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  AppBar,
  Toolbar,
  Container,
  Alert,
  Stack,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../rootes/auth/AuthRoutes";

// E-Mail kontroll
const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { loginHandler } = useAuthContext();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!email.trim()) {
      newErrors.push("Die E-Mail-Adresse darf nicht leer sein.");
    } else if (!isValidEmail(email)) {
      newErrors.push("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    }

    if (!password.trim()) {
      newErrors.push("Das Passwortfeld darf nicht leer sein.");
    }

    setErrors(newErrors);

    // Wenn es Fehler gibt, Vorgang abbrechen
    if (newErrors.length > 0) return;

    const user = {
      email,
      password,
    };

    try {
      await loginHandler(user);
    } catch (error) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Einloggen
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="E-Mail-Adresse"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Passwort"
                margin="normal"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box textAlign="right" mt={1} mb={2}>
                <Link to={AuthRoutes.forgotPassword}>Passwort vergessen?</Link>
              </Box>

              {errors.length > 0 && (
                <Stack spacing={1} mb={2}>
                  {errors.map((err, i) => (
                    <Alert severity="error" key={i}>
                      {err}
                    </Alert>
                  ))}
                </Stack>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ borderRadius: 4, py: 1.5 }}
              >
                Einloggen
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
