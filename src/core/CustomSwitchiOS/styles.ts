import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  "checked" | "track" | "focusVisible" | "thumb" | "input"
>()((theme, _params, classes) => ({
  switchBase: {
    padding: 1,
    [`&.${classes.checked}`]: {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
    },
    [`&.${classes.checked} + .${classes.track}`]: {
      backgroundColor: theme.palette.primary.main,
      opacity: 1,
      border: "none",
    },
    [`&.${classes.focusVisible} .${classes.thumb}`]: {
      color: theme.palette.primary.main,
      border: "6px solid #fff",
    },
  },
  input: {
    "&:focus + span": {
      color: theme.palette.primary.main,
      border: "7px solid #fff",
    },
  },
  checked: {},
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.primary.light}`,
    backgroundColor: theme.palette.primaryGrey.C50,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  thumb: {
    width: 19,
    height: 19,
    marginTop: 1,
  },
  focusVisible: {},
  labelMargin: {
    marginTop: 23,
  },
  switchLabel: {},
  inputErrorSwitchLabel: {
    [`& .${classes.track}`]: {
      backgroundColor: "#ae3131 !important",
    },
  },
  root: {
    width: 37,
    height: 23,
    padding: 0,
    margin: theme.spacing(1),
  },
}));

export default useStyles;
