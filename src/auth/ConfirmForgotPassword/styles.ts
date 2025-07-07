import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  title: {
    textAlign: "center",
    color: "#343333",
    fontSize: 27,
    fontWeight: 700,
    marginTop: 60,
    marginBottom: 30,
  },
  sectionContainer: {
    borderRadius: 5,
    display: "grid",
    background: "white",
    "@media (min-width: 530px)": {
      width: 530,
    },
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 40,
    marginLeft: 20,
    marginRight: 20,
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  buttonsContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 99,
  },
  codeSend: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 33,
    color: "#282835",
    lineHeight: "29px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  checkSpamTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 15,
    color: "#282835",
    lineHeight: "29px",
  },
  checkSpam: {
    marginBottom: 33,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  iconTextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:not(:last-child)": {
      marginRight: 70,
      "@media (max-width: 600px)": {
        marginRight: 15,
      },
      "@media (max-width: 400px)": {
        marginRight: 12,
      },
    },
    marginBottom: 33,
  },
  icon: {
    width: 50,
    marginBottom: 7,
    color: "#5b5b5b",
  },
  iconText: {
    color: "#7D7D7D",
    "@media (max-width: 600px)": {
      fontSize: 13,
    },
    "@media (max-width: 400px)": {
      fontSize: 12,
    },
  },
  passwordChangeSuccessContainer: {
    width: "100%",
    textAlign: "center",
    marginBottom: 99,
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
  resendCodeContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  resendCodeLink: {
    textDecoration: "none",
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
