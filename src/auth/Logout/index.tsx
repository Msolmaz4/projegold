import type { FC } from "react";
import { useCallback, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useStyles from "./styles";

const Logout: FC = () => {
  const { classes } = useStyles();
  const authContext = useAuthContext();

  const logout = useCallback(async () => {
    await authContext.logoutHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <section>
      <Container maxWidth={"lg"}>
        <div className={classes.content}>
          <div className={classes.heading}>
            <Typography variant="h1" className={classes.title}>
              Ausloggen...
            </Typography>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Logout;
