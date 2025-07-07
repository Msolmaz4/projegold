import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 40,
    background: "white",
    borderRadius: 5,
  },
  buttonsContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: 40,
  },
  pageTitle: {
    textAlign: "center",
    fontSize: 27,
    fontWeight: 600,
    marginBottom: 19,
    color: "#343333",
  },
  pageSubtitle: {
    maxWidth: 425,
  },
  changePasswordTextContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  changePasswordTextLink: {
    textDecoration: "none",
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
