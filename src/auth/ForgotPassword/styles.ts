import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 64px)",
    textAlign: "center",
    padding: 16,
    boxSizing: "border-box",
  },
  paper: {
    padding: 24,
  },
  button: {
    marginTop: 16,
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  linkBox: {
    marginTop: 24,
  },
}));

export default useStyles;
