import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    color: theme.palette.primaryGrey.C500,
    // "& svg": {
    //   color: theme.palette.primary.main,
    // },
  },
  checked: {
    color: theme.palette.primary.main,
  },
  label: {
    marginLeft: 5,
  },
  inputError: {
    boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
    borderColor: "#ead6da !important",
    backgroundColor: "#f9f4f4 !important",
  },
  inputSuccess: {
    boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
    borderColor: "#b2d6be !important",
    backgroundColor: "#f7f9f8 !important",
  },
}));

export default useStyles;
