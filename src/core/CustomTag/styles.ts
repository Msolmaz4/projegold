import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  | "textDark"
  | "textLight"
  | "textDefault"
  | "filled"
  | "filledOutlined"
  | "outlined"
  | "saturated"
  | "flat"
  | "pale"
>()((theme, _params, classes) => ({
  tag: {
    borderRadius: 25,
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  xsmallSize: {
    fontSize: 11,
    padding: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  smallSize: {
    fontSize: 12,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: "20px",
  },
  mediumSize: {
    fontSize: 13,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    lineHeight: "25px",
  },
  bigSize: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 17,
    paddingRight: 17,
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
  textLight: {},
  textDark: {},
  textDefault: {},
  filled: {},
  filledOutlined: {},
  outlined: {},
  saturated: {
    color: "#FFFFFF",
    [`&.${classes.textDark}`]: {
      color: "#5a5a5a",
    },
  },
  flat: {
    color: "#FFFFFF",
    [`&.${classes.textDark}`]: {
      color: "#5a5a5a",
    },
  },
  pale: {
    color: "#5a5a5a",
    [`&.${classes.textLight}`]: {
      color: "#FFFFFF",
    },
  },
  white: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#FFFFFF",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#f9f9f9",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#f2f2f2",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#FFFFFF",
        borderColor: "#dadce0",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#f9f9f9",
        borderColor: "#dadce0",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#f2f2f2",
        borderColor: "#dadce0",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#FFFFFF",
        borderColor: "#FFFFFF",
      },
      [`&.${classes.flat}`]: {
        color: "#f9f9f9",
        borderColor: "#f9f9f9",
      },
      [`&.${classes.pale}`]: {
        color: "#f2f2f2",
        borderColor: "#f2f2f2",
      },
    },
  },
  blue: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#3399cc",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#5c9ab6",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#afd1dd",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#3399cc",
        borderColor: "#428dcb",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#5c9ab6",
        borderColor: "#2d748c",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#afd1dd",
        borderColor: "#82b6c4",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#3399cc",
        borderColor: "#3399cc",
      },
      [`&.${classes.flat}`]: {
        color: "#5c9ab6",
        borderColor: "#5c9ab6",
      },
      [`&.${classes.pale}`]: {
        color: "#afd1dd",
        borderColor: "#afd1dd",
      },
    },
  },
  red: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#f91942",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#c97282",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#e28181",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#f91942",
        borderColor: "#cc1d42",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#c97282",
        borderColor: "#9b3a53",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#e28181",
        borderColor: "#ba3838",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#f91942",
        borderColor: "#f91942",
      },
      [`&.${classes.flat}`]: {
        color: "#c97282",
        borderColor: "#c97282",
      },
      [`&.${classes.pale}`]: {
        color: "#e28181",
        borderColor: "#e28181",
      },
    },
  },
  orange: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#ffae00",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#d19d4b",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#eac89b",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#ffae00",
        borderColor: "#c68400",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#d19d4b",
        borderColor: "#8e5809",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#eac89b",
        borderColor: "#dba442",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#ffae00",
        borderColor: "#ffae00",
      },
      [`&.${classes.flat}`]: {
        color: "#d19d4b",
        borderColor: "#d19d4b",
      },
      [`&.${classes.pale}`]: {
        color: "#eac89b",
        borderColor: "#eac89b",
      },
    },
  },
  yellow: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#f7cb47",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#efe88b",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#fcf8b4",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#f7cb47",
        borderColor: "#d1a63b",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#efe88b",
        borderColor: "#c9bb67",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#fcf8b4",
        borderColor: "#c9bb67",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#f7cb47",
        borderColor: "#f7cb47",
      },
      [`&.${classes.flat}`]: {
        color: "#efe88b",
        borderColor: "#efe88b",
      },
      [`&.${classes.pale}`]: {
        color: "#fcf8b4",
        borderColor: "#fcf8b4",
      },
    },
  },
  green: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#79ce42",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#7dad61",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#c8e8b3",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#79ce42",
        borderColor: "#69aa3f",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#7dad61",
        borderColor: "#538930",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#c8e8b3",
        borderColor: "#86b269",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#79ce42",
        borderColor: "#79ce42",
      },
      [`&.${classes.flat}`]: {
        color: "#7dad61",
        borderColor: "#7dad61",
      },
      [`&.${classes.pale}`]: {
        color: "#c8e8b3",
        borderColor: "#c8e8b3",
      },
    },
  },
  darkgreen: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#2e7d32",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#4caf50",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#a5d6a7",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#2e7d32",
        borderColor: "#1b5e20",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#a5d6a7",
        borderColor: "#81c784",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#2e7d32",
        borderColor: "#2e7d32",
      },
      [`&.${classes.flat}`]: {
        color: "#4caf50",
        borderColor: "#4caf50",
      },
      [`&.${classes.pale}`]: {
        color: "#a5d6a7",
        borderColor: "#a5d6a7",
      },
    },
  },
  purple: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#8e24aa",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#b66fc7",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#e3bce6",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#8e24aa",
        borderColor: "#6a1b9a",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#b66fc7",
        borderColor: "#9e4cba",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#e3bce6",
        borderColor: "#c48edc",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#8e24aa",
        borderColor: "#8e24aa",
      },
      [`&.${classes.flat}`]: {
        color: "#b66fc7",
        borderColor: "#b66fc7",
      },
      [`&.${classes.pale}`]: {
        color: "#e3bce6",
        borderColor: "#e3bce6",
      },
    },
  },
  teal: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#00796b",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#48a999",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#b2dfdb",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#00796b",
        borderColor: "#004d40",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#48a999",
        borderColor: "#00796b",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#b2dfdb",
        borderColor: "#80cbc4",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#00796b",
        borderColor: "#00796b",
      },
      [`&.${classes.flat}`]: {
        color: "#48a999",
        borderColor: "#48a999",
      },
      [`&.${classes.pale}`]: {
        color: "#b2dfdb",
        borderColor: "#b2dfdb",
      },
    },
  },
  indigo: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#3949ab",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#5c6bc0",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#c5cae9",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#3949ab",
        borderColor: "#303f9f",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#5c6bc0",
        borderColor: "#3f51b5",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#c5cae9",
        borderColor: "#9fa8da",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#3949ab",
        borderColor: "#3949ab",
      },
      [`&.${classes.flat}`]: {
        color: "#5c6bc0",
        borderColor: "#5c6bc0",
      },
      [`&.${classes.pale}`]: {
        color: "#c5cae9",
        borderColor: "#c5cae9",
      },
    },
  },
  lightblue: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#039be5",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#4fc3f7",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#b3e5fc",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#039be5",
        borderColor: "#0277bd",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#4fc3f7",
        borderColor: "#29b6f6",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#b3e5fc",
        borderColor: "#81d4fa",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#039be5",
        borderColor: "#039be5",
      },
      [`&.${classes.flat}`]: {
        color: "#4fc3f7",
        borderColor: "#4fc3f7",
      },
      [`&.${classes.pale}`]: {
        color: "#b3e5fc",
        borderColor: "#b3e5fc",
      },
    },
  },
  amber: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#ffa000",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#ffb74d",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#ffecb3",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#ffa000",
        borderColor: "#ff8f00",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#ffb74d",
        borderColor: "#ffa726",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#ffecb3",
        borderColor: "#ffe082",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#ffa000",
        borderColor: "#ffa000",
      },
      [`&.${classes.flat}`]: {
        color: "#ffb74d",
        borderColor: "#ffb74d",
      },
      [`&.${classes.pale}`]: {
        color: "#ffecb3",
        borderColor: "#ffecb3",
      },
    },
  },
  grey: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: "#bfbfbf",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#d8d8d8",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#efefef",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: "#bfbfbf",
        borderColor: "#939393",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#d8d8d8",
        borderColor: "#b5b5b5",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#efefef",
        borderColor: "#c6c6c6",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: "#bfbfbf",
        borderColor: "#bfbfbf",
      },
      [`&.${classes.flat}`]: {
        color: "#d8d8d8",
        borderColor: "#d8d8d8",
      },
      [`&.${classes.pale}`]: {
        color: "#efefef",
        borderColor: "#efefef",
      },
    },
  },
  default: {
    [`&.${classes.filled}`]: {
      [`&.${classes.saturated}`]: {
        backgroundColor: theme.palette.primary.main + " !important",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#80b2a8",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#bcd8d3",
      },
    },
    [`&.${classes.filledOutlined}`]: {
      borderWidth: 2,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        backgroundColor: theme.palette.primary.main + " !important",
        borderColor: "#3da894",
      },
      [`&.${classes.flat}`]: {
        backgroundColor: "#80b2a8",
        borderColor: "#99aca9",
      },
      [`&.${classes.pale}`]: {
        backgroundColor: "#bcd8d3",
        borderColor: "#99aca9",
      },
    },
    [`&.${classes.outlined}`]: {
      borderWidth: 1,
      borderStyle: "solid",
      [`&.${classes.saturated}`]: {
        color: theme.palette.primary.main + " !important",
        borderColor: theme.palette.primary.main + " !important",
      },
      [`&.${classes.flat}`]: {
        color: "#80b2a8",
        borderColor: "#80b2a8",
      },
      [`&.${classes.pale}`]: {
        color: "#bcd8d3",
        borderColor: "#bcd8d3",
      },
    },
  },
}));

export default useStyles;
