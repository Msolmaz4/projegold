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
import useStyles from "./styles";

export default function ResetPassword() {
  const { classes } = useStyles();
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

          <Box component="form" className={classes.form}>
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
