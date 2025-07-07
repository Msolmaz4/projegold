import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    '& input[value=""]': {
      color: theme.palette.text.secondary,
    },
    "&:hover": {
      borderColor: theme.palette.primary.main + " !important",
    },
    width: "100%",
    maxWidth: 230,
    marginRight: 15,
    borderRadius: 50,
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    borderColor: "#e9e9e9 !important",
    overflow: "hidden",
  },
  input: {
    position: "relative !important" as "relative",
    fontSize: "16px  !important",
    width: "100%  !important",
    padding: `16px 10px 14px 10px !important`,
    "&::placeholder": {
      color: theme.palette.primary.dark,
    },
  },
  inputInvalid: {
    color: "#c97282",
  },
  focusedInput: {
    backgroundColor: "rgba(0, 0, 0, 0.01)",
    borderColor: "#e2ebea !important",
  },
  searchAdornment: {
    marginLeft: 12,
  },
  buttonAdornment: {
    marginRight: 12,
  },
  searchIcon: {
    width: 25,
    height: 25,
    color: theme.palette.primary.main,
  },
  iconButton: {
    padding: 3,
    color: "#9cacb2",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  settingsIcon: {
    width: 21,
    height: 21,
  },
  resetIcon: {
    width: 21,
    height: 21,
  },
}));

export default useStyles;
