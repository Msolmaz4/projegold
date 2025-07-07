import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  listItem: {
    paddingBottom: 16,
    paddingTop: 16,
    marginLeft: 50,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  listItemTextLineBreak: {
    "@media (max-width: 400px)": {
      display: "none",
    },
  },
  listItemIconActive: {
    minWidth: "unset",
    marginRight: 20,
    borderRadius: 30,
    padding: 5,
    "& svg": {
      color: theme.palette.primary.main,
      width: "35px",
      height: "35px",
    },
  },
  listItemIconInActive: {
    minWidth: "unset",
    marginRight: 20,
    borderRadius: 30,
    padding: 5,
    "& svg": {
      color: theme.palette.text.secondary,
      width: "35px",
      height: "35px",
    },
  },
  listItemTextActive: {
    "& span": {
      lineHeight: "24px",
    },
  },
  listItemTextInActive: {
    color: theme.palette.text.secondary,
    "& span": {
      lineHeight: "24px",
    },
  },
  icon: {
    width: 25,
    height: 25,
  },
}));

export default useStyles;
