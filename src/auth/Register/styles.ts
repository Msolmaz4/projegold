import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    border: "1px solid yellow",
  },
  wrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 64px)",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  container: {
    //border: "1px solid black",
    maxWidth: 250,
    width: "32%",
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 16,
    backgroundColor: "#fff",
    boxShadow: theme.shadows[3],
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: "#343333",
    textAlign: "center",
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    borderRadius: 8,
    padding: theme.spacing(1.5),
    fontWeight: 600,
    textTransform: "none",
  },
  backButton: {
    marginTop: theme.spacing(2),
    fontSize: 14,
    textDecoration: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default useStyles;
