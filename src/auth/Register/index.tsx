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
import { useNavigate } from "react-router";

const RegisterPage = () => {
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

    const newUser = {
      id: Date.now() + Math.floor(Math.random() * 1000000),
      name: "",
      username: "",
      email: formData.email,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "", lng: "" },
      },
      phone: "",
      website: "",
      company: {
        name: formData.name,
        catchPhrase: "",
        bs: "",
      },
      description: "",
      imageURL: "",
      tasks: [],
      aufgabe: [],
      admin: false,
      password: hashedPassword,
    };

    setUsers([...users, newUser]);
    setFormData({ name: "", email: "", password: "" });
    alert("Konto wurde erfolgreich erstellt!");
    navi("/login");
  };
  console.log(users, "sondurum");
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar />
      </AppBar>

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
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Konto erstellen
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
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="E-Mail-Adresse"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Passwort"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                margin="normal"
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
                sx={{ mt: 3, borderRadius: 4, py: 1.5 }}
                type="submit"
              >
                Registrieren
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default RegisterPage;
