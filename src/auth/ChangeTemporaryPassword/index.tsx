import { FC, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid2, Typography } from "@mui/material";
import { confirmSignIn } from "aws-amplify/auth";
import { useAuthContext, useLayoutContext } from "hooks";
import {
  KlickEmail,
  PasswordChangeSuccessIcon,
  ReadEmail,
  RetrieveEmail,
} from "icons";
import { LoginErrorType } from "types";
import { CustomButton, TextInputField } from "core";
import { AuthRoutes } from "routes";
import utils from "utils";
import useStyles from "./styles";

const ChangeTemporaryPassword: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const { notify } = useLayoutContext();

  const [userName, setUsername] = useState<string>("");
  const [temporaryPassword, setTemporaryPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [changePasswordSuccess, setChangePasswordSuccess] =
    useState<boolean>(false);

  const errorRef = useRef<HTMLElement>(null);

  const tryChangePassword = async () => {
    try {
      const regularExpressionPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/;

      console.log("userName: ", userName);
      console.log("temporaryPassword: ", temporaryPassword);
      console.log("password: ", password);
      console.log("confirmedPassword: ", confirmedPassword);

      if (userName === "" || userName.length > 200) {
        return notify("Bitte gib deine E-Mail-Adresse ein!");
      }

      if (temporaryPassword === "" || temporaryPassword.length > 200) {
        return notify(
          "Bitte gib das temporäre Passwort ein, das dir per E-Mail zugeschickt wurde!",
        );
      }

      if (password === "" || password.length > 200) {
        return notify("Bitte gib dein Passwort ein!");
      } else if (confirmedPassword === "" || confirmedPassword.length > 200) {
        return notify("Bitte wiederhole dein Passwort!");
      }

      if (!regularExpressionPassword.test(password)) {
        return notify(
          "Bitte gib ein gültiges Passwort aus mind. 8 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und folgenden Sonderzeichen: ^ $ * . [ ] { } ( ) ?  ! @ # % & / , > <  : ; | _ ~  ein!",
        );
      } else if (password !== confirmedPassword) {
        return notify("Bitte wiederhole dein Passwort!");
      }

      setLoading(true);
      await confirmSignIn({
        challengeResponse: password,
      });

      setSuccess(true);
      setChangePasswordSuccess(true);
      utils.scroll.scrollToRef(errorRef);
    } catch (err: unknown) {
      const error = err as LoginErrorType;

      if (error?.code === "UserNotFoundException") {
        notify(
          "Die angegebene E-Mail-Adresse wurde leider nicht gefunden. Bitte überprüfe deine Eingabe oder kontaktiere den Support!",
        );
      } else if (error?.code === "CodeMismatchException") {
        notify(
          "Das angegebene temporäre Passwort stimmt nicht mit dem dir gesendeten Passwort überein!",
        );
      } else {
        notify(error?.message);
      }
      utils.errorHandling.logToSentry(
        "Error on tryChangePassword!",
        "Authentication -> confirmForgotPassword",
        err,
        authContext,
      );
      setSuccess(false);
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid2
        justifyContent="center"
        alignItems="center"
        container
        direction="column"
      >
        <Typography className={classes.title} variant="h3">
          Passwort ändern
        </Typography>
        {!changePasswordSuccess && (
          <>
            <Grid2 container direction="row" justifyContent="center">
              <div className={classes.iconTextContainer}>
                <RetrieveEmail className={classes.icon} />
                <Typography className={classes.iconText}>
                  Postfach prüfen
                </Typography>
              </div>
              <div className={classes.iconTextContainer}>
                <ReadEmail className={classes.icon} />
                <Typography className={classes.iconText}>
                  E-Mail öffnen
                </Typography>
              </div>
              <div className={classes.iconTextContainer}>
                <KlickEmail className={classes.icon} />
                <Typography className={classes.iconText}>
                  Link in E-Mail klicken
                </Typography>
              </div>
            </Grid2>
            <Grid2>
              <Typography
                className={classes.codeSend}
                variant="h3"
                style={{ fontWeight: 500 }}
              >
                Wir haben dir eine E-Mail mit einem Code geschickt.
                <br />
                Bitte klicke diesen, um dein Passwort zurückzusetzen.
              </Typography>
              <Typography className={classes.checkSpamTitle} variant="h3">
                E-Mail nicht erhalten?
              </Typography>
              <Typography className={classes.checkSpam} variant="body1">
                Es kann passieren, dass Dein E-Mail Provider dieses E-Mail als
                Spam angesehen hat.
                <br />
                Überprüfe dann bitte Deinen Spam- bzw. Junk-E-Mail-Ordner auf
                Erhalt unserer Nachricht.
              </Typography>
            </Grid2>
          </>
        )}
      </Grid2>
      {!changePasswordSuccess && (
        <Grid2
          justifyContent="center"
          alignItems="center"
          container
          direction="column"
        >
          <div className={classes.sectionContainer}>
            <div className={classes.formContainer}>
              <TextInputField
                label="Temporäres Passwort"
                value={temporaryPassword}
                onChange={(e) => setTemporaryPassword(e.target.value)}
                type="text"
              />
              <TextInputField
                label="E-Mail-Adresse"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
              <TextInputField
                label="Neues Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <TextInputField
                label="Neues Passwort wiederholen"
                value={confirmedPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <Grid2
            justifyContent="center"
            alignItems="center"
            container
            direction="column"
            className={classes.buttonsContainer}
          >
            <CustomButton
              text="Passwort ändern"
              onClick={tryChangePassword}
              loading={loading}
              success={success}
              style="filled"
              paddingHorizontal="25px"
            />
            <div className={classes.resendCodeContainer}>
              <Link
                className={classes.resendCodeLink}
                to={AuthRoutes.forgotPassword}
              >
                Code erneut senden
              </Link>
            </div>
          </Grid2>
        </Grid2>
      )}

      {changePasswordSuccess && (
        <Grid2
          justifyContent="center"
          alignItems="center"
          container
          direction="column"
          className={classes.passwordChangeSuccessContainer}
        >
          <PasswordChangeSuccessIcon
            className={classes.passwordChangeSuccessIcon}
          />
          <Typography className={classes.passwordChangeSuccess}>
            Dein Passwort wurde erfolgreich geändert!
            <br />
            Wechsle nun zum Login-Fenster, um dich mit den neuen Zugangsdaten
            einzuloggen.
          </Typography>
          <CustomButton
            text="Jetzt Einloggen"
            onClick={() => navigate(AuthRoutes.login)}
            paddingHorizontal="25px"
            style="filled"
          />
        </Grid2>
      )}
    </>
  );
};

export default ChangeTemporaryPassword;
