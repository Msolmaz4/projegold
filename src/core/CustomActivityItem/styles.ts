import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  activityItem: {
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    "&:not(:last-child)": {
      marginBottom: 75,
    },
  },
  activityItemLabel: {
    width: 110,
    flexShrink: 0,
    position: "relative",
    color: theme.palette.primary.dark,
    fontWeight: 600,
    lineHeight: "20px",
    marginTop: 15,
  },
  activityItemSubLabel: {
    fontSize: 14,
    fontWeight: 500,
  },
  activityItemIcon: {
    flexShrink: 0,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "relative",
    marginTop: 15,
    marginLeft: "-0.5rem",
    padding: "5px !important",
    color: theme.palette.primary.dark,
    backgroundColor: "#edf2f1",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primaryGrey.C400,
    borderRadius: 30,
  },
  activityItemContent: {
    paddingLeft: "20px !important",
    width: "100%",
  },
  activityItemHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#edf2f1",
    borderRadius: 7,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.primaryGrey.C400,
    padding: "5px 20px",
  },
  activityItemBody: {
    padding: "5px 20px",
  },
  bodyOpenButton: {
    // border: "1px double #b8c4c1",
    borderWidth: 1,
    borderStyle: "double",
    borderColor: theme.palette.primaryGrey.C700,
    color: theme.palette.primary.main,
    "& svg": {
      width: 29,
      height: 29,
      transition: "all 0.3s ease",
      marginTop: 1,
    },
  },
  bodyOpenButtonExpanded: {
    "& svg": {
      transform: "rotate(180deg)",
      marginTop: 0,
    },
  },
}));

export default useStyles;
