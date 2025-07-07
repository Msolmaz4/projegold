import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  tab: {
    backgroundColor: "#fcfcfc",
    opacity: 1,
    padding: "15px 25px",
    borderRadius: "5px 5px 0 0",
    "&:not(:first-child)": {
      marginLeft: 3,
    },
    "&:hover": {
      borderColor: theme.palette.primary.main + " !important",
    },
    borderWidth: "1px 1px 0 1px",
    borderColor: "#daeae7",
    borderStyle: "solid",
    color: "#636363",
  },
  selectedTab: {
    backgroundColor: "#fff",
    borderColor: "#9bc6bd",
    color: "#333333",
    boxShadow: "0 0 12px 0 rgba(0,0,0,0.06)",
  },
  tabLabel: {
    display: "flex",
    flexDirection: "row",
    textTransform: "none",
    "& svg": {
      width: 23,
      height: 23,
      marginRight: 10,
    },
  },
}));

export default useStyles;
