import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  iconSort: {
    opacity: 0,
    display: "inline-block",
    height: 22,
    verticalAlign: "middle",
    marginLeft: 3,
    "& svg": {
      width: 20,
      height: 20,
    },
    "& svg g [fill]": {
      fill: theme.palette.primary.main + " !important",
      transition: "fill 0.3s ease",
    },
  },
  sortIndex: {
    marginLeft: 1,
    fontSize: 12,
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
