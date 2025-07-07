import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid2, Typography } from "@mui/material";
import { resetPassword } from "aws-amplify/auth";
import { useLayoutContext } from "hooks";
import { LoginErrorType } from "types";
import { CustomButton, TextInputField } from "core";
import { AuthRoutes } from "routes";
import utils from "utils";
import useStyles from "./styles";

const ForgotPassword: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { notify } = useLayoutContext();

  const [userName, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);

  const resetPasswordRequest = async () => {
    try {
      if (userName === "" || userName.length > 200) {
        return notify("Bitte gib deine E-Mail-Adresse ein!");
      }

      setLoading(true);
      const { nextStep } = await resetPassword({
        username: userName,
      });

      setSuccess(true);
      console.log("nextStep: ", nextStep);
      if (nextStep.codeDeliveryDetails) {
        navigate(AuthRoutes.confirmForgotPassword);
      }
    } catch (err: unknown) {
      const error = err as LoginErrorType;

      console.log("err: ", err);
      if (error?.code === "UserNotFoundException") {
        notify("Benutzer nicht gefunden. Bitte überprüfe deine Eingabe!");
      } else if (error?.code === "LimitExceededException") {
        notify(
          "Das Versuchslimit wurde überschritten. Bitte versuche es nach einiger Zeit nochmal.",
        );
      } else {
        notify(error?.message);
      }

      utils.errorHandling.logToSentry(
        "Error on resetPassword!",
        "Authentication -> forgotPassword",
        err,
        null,
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid2
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography className={classes.pageTitle} variant="h3">
          Passwort vergessen
        </Typography>
        <Typography className={classes.pageSubtitle} variant="subtitle1">
          Gib die deinem Konto zugeordnete E-Mail-Adresse ein. Wir senden dir
          dann einen Link zum Zurücksetzen deines Passworts per E-Mail.
        </Typography>
      </Grid2>
      <Grid2 className={classes.formContainer}>
        <TextInputField
          label="E-Mail-Adresse"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </Grid2>

      <div className={classes.changePasswordTextContainer}>
        <Link
          className={classes.changePasswordTextLink}
          to={AuthRoutes.confirmForgotPassword}
        >
          Ich habe bereits einen Code.
        </Link>
      </div>

      <Grid2 className={classes.buttonsContainer}>
        <CustomButton
          text="Passwort zurücksetzen"
          onClick={resetPasswordRequest}
          loading={loading}
          success={success}
          style="filled"
        />
      </Grid2>
    </>
  );
};

export default ForgotPassword;
