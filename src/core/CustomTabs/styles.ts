import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  tabIndicator: {
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    "@media print": {
      display: "none",
    },
  },
  flexContainer: {
    justifyContent: "center",
  },
}));

export default useStyles;
