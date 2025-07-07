import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  toggleButton: {
    textTransform: "none !important" as "none",
    borderColor: theme.palette.primaryGrey.main + " !important",
    borderStyle: "solid",
    borderWidth: 1,
    padding: "7px 15px 8px !important",
    "&:hover": {
      borderColor: theme.palette.primary.main + " !important",
    },
  },
  toggleButtonSelected: {
    backgroundColor: theme.palette.primaryGrey.main + " !important",
  },
  toggleTitle: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    color: "rgba(0, 0, 0, 0.54)",
  },
  toggleTitleSelected: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  toggleButtonDisabled: {
    color: "rgba(0, 0, 0, 0.25)",
  },
}));

export default useStyles;
