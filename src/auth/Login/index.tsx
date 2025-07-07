import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Collapse, Grid, Typography } from "@mui/material";
import { confirmSignIn, signIn } from "aws-amplify/auth";
import { useAuthContext, useLayoutContext } from "hooks";
import { PasswordChangeSuccessIcon } from "icons";
import { BoxContainer } from "layout";
import { LoginErrorType } from "types";
import { CustomButton, TextInputField } from "core";
import { PasswordField } from "core";
import { AuthRoutes } from "routes";
import utils from "utils";
import useStyles from "./styles";

const Login: FC = () => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const authContext = useAuthContext();
  const { notify } = useLayoutContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [newConfirmedPassword, setNewConfirmedPassword] = useState<string>("");

  const [changePasswordSuccess, setChangePasswordSuccess] =
    useState<boolean>(false);

  const [newPasswordRequired, setNewPasswordRequired] =
    useState<boolean>(false);

  const tryLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (newPasswordRequired) {
        return await changeTemporaryPassword();
      }

      if (userName === "" || userName.length > 200) {
        return notify("Bitte gib deine E-Mail-Adresse ein!");
      }

      if (password === "" || password.length > 200) {
        return notify("Bitte gib dein Passwort ein!");
      }

      setLoading(true);

      const { nextStep } = await signIn({
        username: userName.toLowerCase(),
        password,
      });

      if (
        nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setNewPasswordRequired(true);
        setSuccess(true);
        setLoading(false);
        return notify(
          "Sie müssen das temporäre Passwort ändern. Bitte geben Sie ein neues Passwort ein!",
        );
      }

      await authContext.loginHandler();

      setSuccess(true);
      setLoading(false);
      navigate("/");
    } catch (err: unknown) {
      const error = err as LoginErrorType;
      console.log("Error on login: ", err);

      utils.errorHandling.logToSentry(
        "Error on login!",
        "Authentication",
        err,
        authContext,
      );

      setSuccess(false);

      if (error?.code === "UserNotConfirmedException") {
        navigate(AuthRoutes.verify);
      } else if (error?.code === "UserNotFoundException") {
        notify("Benutzer nicht gefunden. Bitte überprüfe deine Eingabe!");
      } else if (
        error?.code === "NotAuthorizedException" &&
        error?.message?.includes("Incorrect username or password")
      ) {
        notify(
          "Falscher Benutzername oder falsches Passwort. Bitte überprüfe deine Eingabe!",
        );
      } else {
        notify(
          "Beim Anmelden ist ein Fehler aufgetreten. Bitte überprüfe deine Eingabe!",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const changeTemporaryPassword = async () => {
    try {
      if (userName === "" || userName.length > 200) {
        return notify("Bitte gib deine E-Mail-Adresse ein!");
      }

      if (password === "" || password.length > 200) {
        return notify(
          "Bitte gib das temporäre Passwort ein, das dir per E-Mail zugeschickt wurde!",
        );
      }

      if (newPassword === "" || newPassword.length > 200) {
        return notify("Bitte gib dein neues Passwort ein!");
      }

      if (newConfirmedPassword === "" || newConfirmedPassword.length > 200) {
        return notify("Bitte wiederhole dein neues Passwort!");
      }

      setLoading(true);
      setSuccess(true);

      console.log("Getting user...");

      console.log("Got user! Now completing password...");

      const changePasswordRequest = await confirmSignIn({
        challengeResponse: newPassword,
      });

      console.log(
        "Completed Password! changePasswordRequest is: ",
        changePasswordRequest,
      );

      if (!changePasswordRequest) {
        setSuccess(false);
        setLoading(false);
        return notify(
          "Beim Ändern des temporären Passworts ist ein Fehler aufgetreten!",
        );
      }

      await authContext.loginHandler();

      setSuccess(true);
      setLoading(false);
      setPassword(newPassword);
      setNewPasswordRequired(false);
      setChangePasswordSuccess(true);
    } catch (err) {
      console.log("Error on change temporary password: ", err);

      utils.errorHandling.logToSentry(
        "Error on change temporary password!",
        "Authentication",
        err,
        authContext,
      );

      setSuccess(false);
      notify(
        "Beim Anmelden ist ein Fehler aufgetreten. Bitte überprüfe deine Eingabe!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={classes.loginContainer} onSubmit={tryLogin}>
      <Typography style={{ marginBottom: 30 }} variant="h1">
        {newPasswordRequired ? "Temporäres Passwort ändern" : "Einloggen"}
      </Typography>
      <Collapse in={changePasswordSuccess}>
        <Grid
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
            Du kannst dich nun mit den neuen Zugangsdaten einzuloggen.
          </Typography>
        </Grid>
      </Collapse>

      <BoxContainer boxMinWidth="full">
        <div
          className={cx(
            classes.formContainer,
            newPasswordRequired ? classes.temporaryPasswordChange : null,
          )}
        >
          <TextInputField
            label="E-Mail-Adresse"
            id="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            required={true}
          />
          <PasswordField
            label={newPasswordRequired ? "Temporäres Passwort" : "Passwort"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showOnStart={newPasswordRequired}
          />

          <Collapse in={newPasswordRequired}>
            <TextInputField
              label="Neues Passwort"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <TextInputField
              label="Neues Passwort wiederholen"
              value={newConfirmedPassword}
              onChange={(e) => setNewConfirmedPassword(e.target.value)}
              type="password"
            />
          </Collapse>

          {!newPasswordRequired && (
            <Link
              className={classes.forgotPasswordLink}
              to={AuthRoutes.forgotPassword}
            >
              Passwort vergessen?
            </Link>
          )}
        </div>
      </BoxContainer>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 50,
        }}
      >
        <CustomButton
          text={newPasswordRequired ? "Passwort ändern" : "Einloggen"}
          loading={loading}
          success={success}
          paddingHorizontal="25px"
          rootClassName={classes.loginButton}
          type="submit"
          style="filled"
        />
      </div>
    </form>
  );
};

export default Login;
