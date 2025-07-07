import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  titleRoot: {
    margin: 0,
    padding: "25px 40px",
    backgroundColor: "#f6f6f6",
  },
  title: {
    fontSize: 19,
    fontWeight: 400,
    lineHeight: "1.1",
  },
  closeButton: {
    position: "absolute",
    right: 35,
    top: 17,
    color: theme.palette.grey[500],
    backgroundColor: "#e4e4e4",
    "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.red.main,
    },
    "& svg": {
      width: 22,
      height: 22,
    },
  },
  actionsRoot: {
    margin: 0,
    padding: "20px 40px 20px 40px",
    justifyContent: "space-between",
  },
  scrollRoot: {
    overflow: "auto",
  },
  dialogDisabledWrapper: {
    pointerEvents: "none",
    transition: "0.4s",
    position: "relative",
    overflow: "hidden",
  },
  dialogDisabled: {
    opacity: "0.3",
  },
  dialogDisabledContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
