import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    maxWidth: "100%",
  },
  iconStack: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    justifyContent: "space-around",
  },
  iconBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(4),
  },
  infoText: {
    marginTop: theme.spacing(2),
  },
  secondaryText: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    textDecoration: "underline",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));
export default useStyles;
