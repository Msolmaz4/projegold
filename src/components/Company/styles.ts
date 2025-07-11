import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    position: "relative",
  },
  headerTitleBox: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  addButtonBox: {
    marginLeft: "auto",
  },
  swiperWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    minHeight: 220,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  navButtonPrev: {
    left: 2,
  },
  navButtonNext: {
    right: 1,
  },
  slideBox: {
    padding: theme.spacing(1.25, 1.25), // 10px 10px
  },
}));

export default useStyles;
