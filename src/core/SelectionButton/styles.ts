import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "editIcon">()((theme, _params, classes) => ({
  button: {
    border: "2px solid " + theme.palette.primaryGrey.C100,
    "&:hover": {
      backgroundColor: "rgba(51, 51, 51, 0.02)",
      border: "2px solid " + theme.palette.primary.main,
    },
  },
  buttonText: {
    borderRight: "2px solid " + theme.palette.primaryGrey.C100,
    paddingRight: 10,
    marginRight: 10,
    fontSize: 14,
  },
  buttonTextDisabled: {
    color: "#acacac",
  },
  editIcon: {
    width: 23,
    height: 23,
    color: theme.palette.primary.main,
  },
  editIconDisabled: {
    color: theme.palette.primaryGrey.C100,
  },
  focusVisible: {
    border: "2px solid #e8e6bf",
    [`& .${classes.editIcon}`]: {
      color: "#aaa661",
    },
  },
}));

export default useStyles;
