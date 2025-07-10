import React from "react";
import { Button, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

import useStyles from "./styles";
import { Loading } from "../../core";

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
  const { classes } = useStyles();
  const authContext = useAuthContext();

  return (
    <div className={classes.root}>
      {authContext?.isLoading ? <Loading size="33px" /> : /*<MenuBar />*/ null}
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
        <Button onClick={() => (window.location.href = "/")} />
      </main>
    </div>
  );
};

export default ErrorPage;
