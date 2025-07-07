import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "root" | "editIcon">()(
  (theme, _params, classes) => ({
    root: {
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
    clearButton: {
      width: 27,
      height: 27,
      padding: 7,
      marginRight: 3,
    },
    clearIcon: {
      width: 19,
      height: 19,
      color: theme.palette.primaryGrey.main,
      "& g": {
        strokeWidth: "3",
      },
      verticalAlign: "middle",
    },
    editButton: {
      padding: 0,
      marginLeft: 15,
      "&:hover": {
        background: "none",
      },
      [`& .${classes.editIcon}`]: {
        color: theme.palette.primary.main,
      },
      [`&:hover .${classes.editIcon}`]: {
        color: theme.palette.primary.dark,
      },
    },
    editIcon: {
      width: 23,
      height: 23,
    },
  }),
);

export default useStyles;
