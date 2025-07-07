import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "root">()((theme, _params, classes) => ({
  root: {
    "label + &": {
      marginTop: 4,
    },
    '& input[value=""]': {
      color: theme.palette.text.secondary,
    },
    "&:hover": {
      borderColor: theme.palette.primary.main + " !important",
    },
    width: "100%",
    backgroundColor: "#fafafc !important",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.4) !important",
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    borderColor: "#a9bebb !important",
    overflow: "hidden",
  },
  input: {
    position: "relative !important" as "relative",
    fontSize: "16px  !important",
    width: "100%  !important",
    padding: `10px 12px !important`,
    height: 19,
  },
  focusedInput: {
    boxShadow: "0 0 5px rgba(183, 216, 224, 0.4) !important",
    borderColor: "#a9bebb !important",
  },
  phonePrefix: {
    width: 93,
    zIndex: 999,
  },
  gridPhone: {
    "@media (max-width: 470px)": {
      minWidth: "65%",
    },
    maxWidth: "calc(100% - 98px)",
  },
  textInputLabel: {
    color: theme.palette.primary.dark,
    fontSize: "13px",
    textAlign: "left",
    marginBottom: 5,
  },
  labelDescription: {
    color: theme.palette.text.secondary,
    fontSize: "13px",
    marginLeft: 7,
  },
  infoButton: {
    padding: 0,
    marginLeft: 10,
  },
  infoIcon: {
    width: 25,
    height: 25,
    color: theme.palette.primary.main,
  },
  descriptionPopup: {
    padding: 15,
  },
  phoneNumber: {
    width: "100%",
  },
  formControlRoot: {
    width: "100%",
  },
  inputError: {
    [`& .${classes.root}`]: {
      boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
      borderColor: "#ead6da !important",
      backgroundColor: "#f9f4f4 !important",
    },
  },
  inputSuccess: {
    [`& .${classes.root}`]: {
      boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
      borderColor: "#b2d6be !important",
      backgroundColor: "#f7f9f8 !important",
    },
  },
  successIcon: {
    color: "#5dd889 !important",
    width: 29,
    height: 29,
    "& path": {
      strokeDasharray: 65,
      strokeDashoffset: 65,
      animation: `lineAnimation 1.3s ease-out forwards`,
    },
  },
  errorIcon: {
    color: theme.palette.red.main,
    width: 29,
    height: 29,
    "& path": {
      strokeDasharray: 27,
      strokeDashoffset: 27,
      animation: `lineAnimation 1.3s ease-out forwards`,
    },
  },
}));

export default useStyles;
