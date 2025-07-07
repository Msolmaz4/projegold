import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  inputError: {
    "& input": {
      boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
      borderColor: "#ead6da !important",
      backgroundColor: "#f9f4f4 !important",
    },
  },
  inputSuccess: {
    "& input": {
      boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
      borderColor: "#b2d6be !important",
      backgroundColor: "#f7f9f8 !important",
    },
  },
  datePicker: {
    marginTop: 0,
    "& .MuiInput-underline": {
      marginTop: 0,
    },
    "& .MuiInput-underline::after": {
      border: 0,
    },
    "& .MuiInput-underline::before": {
      border: 0,
      content: "none",
    },
  },
  marginBottom: {
    marginBottom: 15,
  },
  datePickerButton: {
    marginLeft: 7,
  },
  datePickerButtonSingle: {
    marginLeft: -1,
  },
  calendarIcon: {
    color: theme.palette.primary.main,
    width: 29,
    height: 29,
  },
  calendarIconDisabled: {
    color: theme.palette.grey[400],
    width: 29,
    height: 29,
  },
  successIconSpan: {
    lineHeight: 0,
    marginLeft: -33,
    zIndex: 10,
    pointerEvents: "none",
  },
  successIcon: {
    color: "#5dd889 !important",
    width: 25,
    height: 25,
    "& path": {
      strokeDasharray: 65,
      strokeDashoffset: 65,
      animation: `lineAnimation 1.3s ease-out forwards`,
    },
  },
  errorIconSpan: {
    lineHeight: 0,
    zIndex: 10,
    pointerEvents: "none",
    marginLeft: -33,
  },
  errorIcon: {
    color: theme.palette.red.main,
    width: 25,
    height: 25,
    "& path": {
      strokeDasharray: 27,
      strokeDashoffset: 27,
      animation: "lineAnimation 1.3s ease-out forwards",
    },
  },
  input: {
    "&[inputmode='text'][value='hh:mm']": {
      color: theme.palette.text.secondary + " !important",
    },
    "&:hover": {
      borderColor: theme.palette.primary.main + " !important",
    },
    "&:focus": {
      boxShadow: "0 0 5px rgba(183, 216, 224, 0.4)",
      borderColor: theme.palette.primary.main + " !important",
    },
    position: "relative !important" as "relative",
    fontSize: "16px  !important",
    width: "100%  !important",
    padding: `6px 12px !important`,
    height: 19,
    backgroundColor: "#fafafc !important",
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.4) !important",
    borderStyle: "solid !important",
    borderWidth: "1px !important",
    borderColor: "#a9bebb !important",
    overflow: "hidden",
    maxWidth: 130,
  },
}));

export default useStyles;
