import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  container: {
    maxWidth: 460,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 16,
    backgroundColor: "#fff",
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: "#343333",
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    maxWidth: 425,
    margin: "0 auto",
    marginBottom: theme.spacing(4),
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    borderRadius: 8,
    fontWeight: 600,
    textTransform: "none",
  },
  bottomLink: {
    marginTop: theme.spacing(3),
    "& a": {
      textDecoration: "none",
      color: "grey",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}));

export default useStyles;
