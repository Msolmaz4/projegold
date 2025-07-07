import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "saturated" | "flat" | "pale">()(
  (_, _params, classes) => ({
    labeledTypographyXSmall: {
      fontSize: 13,
      textAlign: "left",
      lineHeight: "20px",
    },
    labeledTypographySmall: {
      fontSize: 15,
      textAlign: "left",
      lineHeight: "24px",
    },
    labeledTypographyMedium: {
      fontSize: 17,
      textAlign: "left",
      lineHeight: "28px",
    },
    labeledTypographyLarge: {
      fontSize: 19,
      textAlign: "left",
      lineHeight: "32px",
    },
    saturated: {},
    flat: {},
    pale: {},
    white: {
      [`&.${classes.saturated}`]: {
        color: "#FFFFFF",
      },
      [`&.${classes.flat}`]: {
        color: "#f9f9f9",
      },
      [`&.${classes.pale}`]: {
        color: "#f2f2f2",
      },
    },
    blue: {
      [`&.${classes.saturated}`]: {
        color: "#3399cc",
      },
      [`&.${classes.flat}`]: {
        color: "#5c9ab6",
      },
      [`&.${classes.pale}`]: {
        color: "#afd1dd",
      },
    },
    red: {
      [`&.${classes.saturated}`]: {
        color: "#f91942",
      },
      [`&.${classes.flat}`]: {
        color: "#c97282",
      },
      [`&.${classes.pale}`]: {
        color: "#e28181",
      },
    },
    orange: {
      [`&.${classes.saturated}`]: {
        color: "#ffae00",
      },
      [`&.${classes.flat}`]: {
        color: "#d19d4b",
      },
      [`&.${classes.pale}`]: {
        color: "#eac89b",
      },
    },
    yellow: {
      [`&.${classes.saturated}`]: {
        color: "#f7cb47",
      },
      [`&.${classes.flat}`]: {
        color: "#efe88b",
      },
      [`&.${classes.pale}`]: {
        color: "#fcf8b4",
      },
    },
    green: {
      [`&.${classes.saturated}`]: {
        color: "#79ce42",
      },
      [`&.${classes.flat}`]: {
        color: "#7dad61",
      },
      [`&.${classes.pale}`]: {
        color: "#c8e8b3",
      },
    },
    grey: {
      [`&.${classes.saturated}`]: {
        color: "#bfbfbf",
      },
      [`&.${classes.flat}`]: {
        color: "#d8d8d8",
      },
      [`&.${classes.pale}`]: {
        color: "#efefef",
      },
    },
    default: {
      [`&.${classes.saturated}`]: {
        color: "#000",
      },
      [`&.${classes.flat}`]: {
        color: "#555560",
      },
      [`&.${classes.pale}`]: {
        color: "#282835",
      },
    },
    underline: {
      textDecoration: "underline",
    },
    bold: {
      fontWeight: "bold",
    },
    italic: {
      fontStyle: "italic",
    },
  }),
);

export default useStyles;
