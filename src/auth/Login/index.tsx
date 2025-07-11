import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../rootes/auth/AuthRoutes";
import AnmeldungButton from "../../core/button/AnmeldungButton";
import useStyles from "./styles";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { loginHandler } = useAuthContext();
  const { classes } = useStyles();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!email.trim())
      newErrors.push("Die E-Mail-Adresse darf nicht leer sein.");
    else if (!isValidEmail(email))
      newErrors.push("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    if (!password.trim())
      newErrors.push("Das Passwortfeld darf nicht leer sein.");

    setErrors(newErrors);
    if (newErrors.length > 0) return;

    try {
      await loginHandler({ email, password });
    } catch {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Box className={classes.root}>
      <AnmeldungButton />
      <Box className={classes.wrapper}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            Einloggen
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              label="E-Mail-Adresse"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.textField}
              required
            />
            <TextField
              label="Passwort"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.textField}
              required
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
            <div className={classes.forgotPassword}>
              <Link to={AuthRoutes.forgotPassword}>Passwort vergessen?</Link>
            </div>
            {errors.length > 0 && (
              <Stack spacing={1} className={classes.errorStack}>
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
              className={classes.button}
            >
              Einloggen
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
