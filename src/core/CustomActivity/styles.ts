import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  activity: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 120,
      width: 3,
      top: 20,
      bottom: 30,
      backgroundColor: theme.palette.primary.C200,
    },
    "@media (min-width: 1920px)": {
      width: 1600,
    },
    "@media (min-width: 1600px) and (max-width: 1919.95px)": {
      width: 1440,
    },
    "@media (min-width: 1440px) and (max-width: 1599.95px)": {
      width: 1200,
    },
    "@media (min-width: 1280px) and (max-width: 1439.95px)": {
      width: 1024,
    },
    "@media (min-width: 1024px) and (max-width: 1279.95px)": {
      width: 800,
    },
    "@media (min-width: 768px) and (max-width: 1023.95px)": {
      width: 600,
    },
  },
  loadMoreButton: {
    display: "flex !important",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  loadAllButton: {
    marginTop: 33,
    marginBottom: 33,
    marginLeft: 33,
  },
  loadButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
