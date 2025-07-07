import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "root">()((theme, _params, classes) => ({
  autocompleteContainer: {
    position: "relative",
  },
  autocompleteDropdownContainer: {
    top: "100%",
    backgroundColor: "hsl(0,0%,100%)",
    borderRadius: 4,
    boxShadow: "none",
    // marginBottom: 8,
    marginTop: -3,
    position: "absolute",
    width: "100%",
    zIndex: 1,
    boxSizing: "border-box",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTop: 0,
    borderLeft: "1px solid #a9bebb",
    borderRight: "1px solid #a9bebb",
    borderBottom: "1px solid #a9bebb",
  },
  menuList: {
    overflowY: "auto",
    // paddingBottom: 4,
    // paddingTop: 4,
    position: "relative",
    WebkitOverflowScrolling: "touch",
    boxSizing: "border-box",
    fontSize: "13px",
    textAlign: "left",
    color: theme.palette.text.primary,
  },
  suggestion: {},
  suggestionItem: {
    padding: 5,
  },
  suggestionItemActive: {
    padding: 5,
    color: theme.palette.primary.main,
  },
  locationSearchInputRoot: {},
  root: {
    '& input[value=""]': {
      color: theme.palette.text.secondary,
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
      animation: "lineAnimation 1s ease-out forwards",
    },
  },
  errorIcon: {
    color: theme.palette.red.main,
    width: 29,
    height: 29,
    "& path": {
      strokeDasharray: 27,
      strokeDashoffset: 27,
      animation: "lineAnimation 1.3s ease-out forwards",
    },
  },
}));

export default useStyles;
