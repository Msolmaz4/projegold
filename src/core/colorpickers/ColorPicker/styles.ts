import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  input: {
    position: "relative !important" as "relative",
    fontSize: "16px  !important",
    width: "100%  !important",
    padding: `10px 12px !important`,
    height: 19,
  },
  inputMarginBottom: {
    marginBottom: "15px !important",
  },
  focusedInput: {
    boxShadow: "0 0 5px rgba(183, 216, 224, 0.4) !important",
    borderColor: "#a9bebb !important",
  },
  formControlRoot: {
    width: "100%",
  },
  inputError: {},
  inputSuccess: {},
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
  unitAdornment: {
    fontWeight: 500,
    padding: "10px 7px",
    backgroundImage: "linear-gradient(to top, #f1f1f1, #fcfcfc)",
    borderLeft: "1px solid #a9bebb",
    color: "#969696",
    pointerEvents: "none",
    fontSize: 15,
    fontFamily: "Raleway",
  },
  colorSwatch: {
    width: 117,
    height: 50,
    borderRadius: 5,
    cursor: "pointer",
  },
}));

export default useStyles;
