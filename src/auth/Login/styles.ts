import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  loginContainer: {
    display: "grid",
    "@media (min-width: 450px)": {
      width: 550,
    },
    [theme.breakpoints.only("md")]: {
      width: 440,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: 450,
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "40px 75px !important",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("md")]: {
      padding: "40px 40px !important",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "40px !important",
      margin: 0,
    },
  },
  forgotPasswordLink: {
    textDecoration: "none",
    color: "grey",
    marginLeft: "10px",
    marginTop: 15,
    textAlign: "center",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  temporaryPasswordChange: {
    height: "500px !important",
  },
  passwordChangeSuccessContainer: {
    width: "100%",
    textAlign: "center",
  },
  passwordChangeSuccess: {
    color: "#4caf50",
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 33,
    lineHeight: "29px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  passwordChangeSuccessIcon: {
    width: 99,
    height: 99,
    marginBottom: 33,
    color: theme.palette.primary.main,
    "& path": {
      strokeWidth: "1.1",
    },
  },
  loginButton: {
    marginBottom: 50,
  },
}));

export default useStyles;
