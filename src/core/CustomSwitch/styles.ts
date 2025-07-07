import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  | "switchBase"
  | "checked"
  | "track"
  | "focusVisible"
  | "thumb"
  | "input"
  | "disabled"
>()((theme, _params, classes) => ({
  switchRoot: {
    "&:hover": {
      [`& .${classes.thumb}`]: {
        color: theme.palette.primary.main,
        border: "6px solid " + theme.palette.primary.C50,
      },
      [`& .${classes.disabled} .${classes.thumb}`]: {
        color: "#f5f5f5",
        border: "none !important",
      },
    },
  },
  switchBase: {
    [`&.${classes.checked}`]: {
      color: theme.palette.primary.main,
    },
    [`&.${classes.checked} + .${classes.track}`]: {
      backgroundColor: theme.palette.primary.light,
    },
    padding: 0,
    margin: 9,
    [`&.${classes.focusVisible} .${classes.thumb}`]: {
      color: "#b0b0b0",
      border: "6px solid " + theme.palette.primary.C50,
    },
    [`&.${classes.focusVisible}.${classes.checked} .${classes.thumb}`]: {
      color: theme.palette.primary.main,
      border: "6px solid " + theme.palette.primary.C50,
    },
  },
  input: {
    "&:focus + span": {
      color: "#b0b0b0",
      border: "6px solid " + theme.palette.primary.C50,
    },
  },
  checked: {
    [`& .${classes.input}:focus + span`]: {
      color: theme.palette.primary.main,
      border: "6px solid " + theme.palette.primary.C50,
    },
  },
  disabled: {
    border: "none !important",
  },
  track: {},
  thumb: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  },
  focusVisible: {
    boxShadow: "0 1px 5px rgba(183, 216, 224, 0.7) !important",
  },
  labelMargin: {
    marginTop: 23,
  },
  switchLabel: {},
  inputErrorSwitchLabel: {
    [`& .${classes.track}`]: {
      backgroundColor: "#ae3131 !important",
    },
  },
}));

export default useStyles;
