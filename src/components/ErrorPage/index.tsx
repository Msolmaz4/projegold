import React from "react";
import { Typography } from "@mui/material";
import { useAuthContext } from "hooks";
import { CustomButton, Loading } from "core";
import utils from "utils";
import useStyles from "./styles";

type ErrorPageProps = {
  eventID?: string | null;
  errorTitle: string;
  errorMessage: string;
  errorDescription?: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  eventID,
  errorTitle,
  errorMessage,
  errorDescription,
}) => {
  utils.logger.info("eventID: ", eventID);
  const { classes } = useStyles();
  const authContext = useAuthContext();

  return (
    <div className={classes.root}>
      {authContext.isLoading ? <Loading size="33px" /> : /*<MenuBar />*/ null}
      <main className={classes.content}>
        <Typography className={classes.headerText}>{errorTitle}</Typography>

        <Typography className={classes.errorText}>{errorMessage}</Typography>

        {errorDescription && (
          <Typography className={classes.errorDescription}>
            {errorDescription}
          </Typography>
        )}

        {eventID && (
          <Typography className={classes.sentryEventID}>
            {"Event-ID: " + eventID}
          </Typography>
        )}

        <CustomButton
          text="Zur Startseite"
          onClick={() => (window.location.href = "/")}
          style="filled"
        />
      </main>
    </div>
  );
};

export default ErrorPage;
