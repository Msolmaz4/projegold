import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserContext } from "../../hooks/user/useUserContext";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router";
import { AuthRoutes } from "../../rootes";
import useStyles from "./styles";
import NewUser from "../../core/newUser";

const RegisterPage = () => {
  const { classes } = useStyles();
  const { setUsers, users } = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const navi = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(formData.password).toString();
    const userExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (userExists) {
      setFormData({ name: "", email: "", password: "" });
      alert("Dieser Benutzer ist bereits registriert!");
      return;
    }

    const newUser = NewUser({
      name: formData.name,
      email: formData.email,
      hashedPassword,
    });

    setUsers([...users, newUser]);
    setFormData({ name: "", email: "", password: "" });
    alert("Konto wurde erfolgreich erstellt!");
    navi("/login");
  };
  console.log(users, "sondurum");
  return (
    <Box className={classes.root}>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar />
      </AppBar>
      <Box className={classes.wrapper}>
        <Container className={classes.container}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              Konto Erstellen
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleRegister}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={classes.textField}
                required
              />
              <TextField
                fullWidth
                label="E-Mail-Adresse"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className={classes.textField}
                required
              />
              <TextField
                fullWidth
                label="Passwort"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Registrieren
              </Button>
              <Button
                variant="text"
                size="small"
                className={classes.backButton}
              >
                <Link to={AuthRoutes.login}>Zurück</Link>
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default RegisterPage;
