import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Üst Bar sadece "Anmelden" ile */}
      <AppBar position="static" elevation={0} color="default">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<LoginIcon />}
            sx={{ borderRadius: 10, textTransform: "none" }}
          >
            Anmelden
          </Button>
        </Toolbar>
      </AppBar>

      {/* Ortalanmış Giriş Kutusu */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)", // AppBar yüksekliği çıkarıldı
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Einloggen
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="E-Mail-Adresse"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Passwort"
                margin="normal"
                required
                type={showPassword ? "text" : "password"}
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
                <Link href="#" variant="body2">
                  Passwort vergessen?
                </Link>
              </Box>
              <Button
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
