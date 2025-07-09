import React from "react";
import useStyles from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const { classes } = useStyles();

  return <div className={classes.authContent}>{children}</div>;
};

export default AuthLayout;
