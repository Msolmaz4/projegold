import { red } from "@mui/material/colors";
import { makeStyles } from "tss-react/mui";
import { ButtonColor, ButtonSize, ButtonStyle } from "types";

type CustomButtonStyleProps = {
  size?: ButtonSize;
  color?: ButtonColor;
  hoverColor?: ButtonColor;
  style?: ButtonStyle;
};

const useStyles = makeStyles<
  CustomButtonStyleProps,
  "iconBeforeWrapper" | "iconAfterWrapper"
>()((theme, { size }, classes) => ({
  button: {
    borderRadius: 50,
  },
  link: {
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
  },
  linkDefault: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  linkBlue: {
    color: "#5c9bb7",
    "&:hover": {
      color: "#2e82a8",
    },
  },
  linkDarkBlue: {
    color: "#06c",
    "&:hover": {
      color: "#5c9bb7",
    },
  },
  linkNowrap: {
    whiteSpace: "nowrap",
  },
  iconBeforeWrapper: {
    marginBottom: -2,
  },
  iconAfterWrapper: {
    marginBottom: -2,
  },
  xSmallSize: {
    fontSize: 11,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    "& i": {
      fontSize: 13,
    },
    [`& .${classes.iconBeforeWrapper}`]: {
      "& svg": {
        width: 21,
        height: 21,
        marginTop: 3,
      },
      marginRight: 7,
    },
    [`& .${classes.iconAfterWrapper}`]: {
      "& svg": {
        width: 21,
        height: 21,
        marginTop: 3,
      },
      marginLeft: 7,
    },
    lineHeight: "20px",
  },
  smallSize: {
    fontSize: 13,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    "& i": {
      fontSize: 15,
    },
    [`& .${classes.iconBeforeWrapper}`]: {
      "& svg": {
        width: 25,
        height: 25,
        marginTop: 3,
      },
      marginRight: 7,
    },
    [`& .${classes.iconAfterWrapper}`]: {
      "& svg": {
        width: 25,
        height: 25,
        marginTop: 3,
      },
      marginLeft: 7,
    },
    lineHeight: "25px",
  },
  smallSizeResponsiveOnly: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  mediumSize: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 17,
    paddingRight: 17,
    "& i": {
      fontSize: 15,
    },
    [`& .${classes.iconBeforeWrapper} i`]: {
      marginRight: 7,
    },
    [`& .${classes.iconAfterWrapper} i`]: {
      marginLeft: 7,
    },
  },
  bigSize: {
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    "@media (max-width:575px)": {
      fontSize: 17,
      padding: 10,
      paddingLeft: 12,
      paddingRight: 12,
      minWidth: 170,
    },
    "@media (min-width:576px) and (max-width:991px)": {
      fontSize: 20,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 15,
      paddingRight: 15,
      minWidth: 220,
    },
  },
  filledBlue: {
    color: "#FFFFFF",
    backgroundColor: "#5c9bb7",
  },
  hoverBlue: {
    "&:hover": {
      backgroundColor: "#67a4bf",
    },
  },
  outlinedBlue: {
    color: "#5c9bb7",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#5c9bb7",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#5c9bb7",
    },
  },
  filledDefault: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.primary.main,
  },
  hoverDefault: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  outlinedDefault: {
    color: theme.palette.primary.main,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
    "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
    },
  },
  filledRed: {
    color: "#FFFFFF",
    backgroundColor: theme.palette.red.main,
  },
  hoverRed: {
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: theme.palette.red.light,
    },
  },
  outlinedRed: {
    color: theme.palette.red.main,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.red.main,
    "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.red.main,
    },
  },
  filledFlatRed: {
    color: "#FFFFFF",
    backgroundColor: "#c97282",
  },
  hoverFlatRed: {
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#d78594",
    },
  },
  outlinedFlatRed: {
    color: "#c97282",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#c97282",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#c97282",
    },
  },
  filledYellow: {
    color: "#FFFFFF",
    backgroundColor: "#F7CB47",
  },
  hoverYellow: {
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "#F4C756",
    },
  },
  outlinedYellow: {
    color: "#F7CB47",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F7CB47",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#F7CB47",
    },
  },
  filledGrey: {
    color: "#666",
    backgroundColor: "#e9e9e9",
  },
  hoverGrey: {
    "&:hover": {
      backgroundColor: "#dad9d9",
    },
  },
  outlinedGrey: {
    color: "#666",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e9e9e9",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.02)",
    },
  },
  filledGreen: {
    color: "#ffffff",
    backgroundColor: "#7dad61",
  },
  hoverGreen: {
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#87af6d",
    },
  },
  outlinedGreen: {
    color: "#7dad61",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#7dad61",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#7dad61",
    },
  },
  filledWhite: {
    color: "#3c4043",
    border: "1px solid #dadce0",
    backgroundColor: "#FFFFFF",
  },
  hoverWhite: {
    "&:hover": {
      backgroundColor: "#f7f8f8",
    },
  },
  outlinedWhite: {
    color: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.02)",
    },
  },
  loadingBlue: {
    color: "#7c99a8",
    backgroundColor: "#c8d6de",
    "&:hover": {
      backgroundColor: "#c8d6de",
    },
    cursor: "not-allowed",
  },
  disabledButton: {
    color: "#7c99a8",
    backgroundColor: "#c8d6de",
    border: "1px solid #b7c7ce",
    "&:hover": {
      backgroundColor: "#c8d6de",
    },
    cursor: "not-allowed",
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop:
      size === "large"
        ? -18
        : size === "medium"
          ? -16
          : size === "small"
            ? -13
            : -10,
    marginLeft:
      size === "large"
        ? -18
        : size === "medium"
          ? -16
          : size === "small"
            ? -13
            : -10,
    "&:hover": {
      boxShadow: "none",
    },
  },
  buttonProgressWithNumber: {
    marginTop:
      size === "large"
        ? -18
        : size === "medium"
          ? -16
          : size === "small"
            ? -13
            : -10,
    marginLeft:
      size === "large"
        ? -18
        : size === "medium"
          ? -16
          : size === "small"
            ? -13
            : -10,
    backgroundColor: "rgba(255, 255, 255, 0.63)",
    boxShadow: "0 0 11px 7px rgba(255,255,255,0.63)",
    borderRadius: "50%",
  },
  buttonFailed: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  focusVisible: {
    boxShadow: "0 0 5px rgba(255, 255, 255, 0.4) !important",
    color: "#aaa661",
    borderColor: "#aaa661",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#aaa661",
    },
  },
  textContent: {
    whiteSpace: "nowrap",
  },

  textButton: {
    textDecoration: "none",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
    minWidth: "unset",
  },
  textBlue: {
    color: "#5c9bb7",
    "&:hover": {
      color: "#2e82a8",
    },
  },
  textRed: {
    color: theme.palette.red.main,
    "&:hover": {
      color: "#fff",
    },
  },
  textFlatRed: {
    color: "#c97282",
    "&:hover": {
      color: "#fff",
    },
  },
  textWhite: {
    color: "#fff",
    "&:hover": {
      color: "#fff",
    },
  },
  textYellow: {
    color: "#F7CB47",
    "&:hover": {
      color: "#fff",
    },
  },
  textGrey: {
    color: "#666",
    "&:hover": {
      color: "#fff",
    },
  },
  textGreen: {
    color: "#7dad61",
    "&:hover": {
      color: "#fff",
    },
  },
  textDefault: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  textXSmallSize: {
    fontSize: 11,
    "& i": {
      fontSize: 13,
    },
    [`& .${classes.iconBeforeWrapper} i`]: {
      marginRight: 5,
    },
    [`& .${classes.iconAfterWrapper} i`]: {
      marginLeft: 5,
    },
    lineHeight: "21px",
  },
  textSmallSize: {
    fontSize: 13,
    "& i": {
      fontSize: 15,
    },
    [`& .${classes.iconBeforeWrapper} i`]: {
      marginRight: 7,
    },
    [`& .${classes.iconAfterWrapper} i`]: {
      marginLeft: 7,
    },
    lineHeight: "25px",
  },
  textMediumSize: {
    fontSize: 16,
    "& i": {
      fontSize: 15,
    },
    [`& .${classes.iconBeforeWrapper} i`]: {
      marginRight: 7,
    },
    [`& .${classes.iconAfterWrapper} i`]: {
      marginLeft: 7,
    },
  },
  textBigSize: {
    fontSize: 25,
    "@media (max-width:575px)": {
      fontSize: 17,
    },
    "@media (min-width:576px) and (max-width:991px)": {
      fontSize: 20,
    },
  },
  loadingTime: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 15,
  },
  buttonLink: {
    textDecoration: "none",
  },
}));

export default useStyles;
