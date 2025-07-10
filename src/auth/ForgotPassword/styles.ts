import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 64px)",
    textAlign: "center",
  },
  container: {
    maxWidth: theme.breakpoints.values.sm,
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
    maxWidth: 300,
    "& .MuiInputBase-root": {
      fontSize: "0.8rem",
      height: 36,
      padding: "0 10px",
    },
    "& .MuiInputBase-input": {
      padding: 0,
    },
  },
  button: {
    marginTop: theme.spacing(2),
    borderRadius: 4,
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
  linkBox: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
