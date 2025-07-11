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
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Der ‚Anmelden‘-Button oben rechts */}

      <AnmeldungButton />

      {/* Dividen Form */}
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Passwort ändern
          </Typography>

          <Stack direction="row" justifyContent="space-around" mt={4} mb={2}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <MailOutlineIcon fontSize="large" />
              <Typography variant="caption">Postfach prüfen</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <MarkEmailReadIcon fontSize="large" />
              <Typography variant="caption">E-Mail öffnen</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <LinkIcon fontSize="large" />
              <Typography variant="caption">Link in E-Mail klicken</Typography>
            </Box>
          </Stack>

          <Typography mt={2}>
            Wir haben dir eine E-Mail mit einem Code geschickt. <br />
            Bitte klicke diesen, um dein Passwort zurückzusetzen.
          </Typography>

          <Typography mt={2} color="textSecondary" fontSize={14}>
            E-Mail nicht erhalten?
          </Typography>
          <Typography fontSize={14}>
            Es kann passieren, dass Dein E-Mail Provider dieses E-Mail als Spam
            angesehen hat. Überprüfe dann bitte Deinen Spam- bzw.
            Junk-E-Mail-Ordner auf Erhalt unserer Nachricht.
          </Typography>

          <Box component="form" mt={4}>
            <Stack spacing={2}>
              <TextField fullWidth label="Code" />
              <TextField fullWidth label="E-Mail-Adresse" type="email" />
              <TextField fullWidth label="Passwort" type="password" />
              <TextField
                fullWidth
                label="Passwort wiederholen"
                type="password"
              />
              <Button variant="contained" color="primary" fullWidth>
                Passwort ändern
              </Button>
              <Link
                to={AuthRoutes.forgotPassword}
                underline="hover"
                fontSize={14}
              >
                Code erneut senden
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
