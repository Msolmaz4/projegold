import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    minHeight: "100%",
  },
  content: {
    flexGrow: 1,
    "& button:focus": {
      outline: "0",
    },
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: theme.palette.primary.main,
    marginTop: 99,
    fontSize: 99,
    fontWeight: "bold",
    marginBottom: 63,
    lineHeight: "inherit",
  },
  errorText: {
    color: theme.palette.primary.main,
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 15,
  },
  errorDescription: {
    color: "#7f9cac",
    fontSize: 17,
    fontWeight: 500,
    marginTop: 15,
    marginBottom: 30,
  },
  sentryEventID: {
    color: "#7f9cac",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 50,
  },
}));

export default useStyles;
