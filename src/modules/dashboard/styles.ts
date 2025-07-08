import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  dashboardPage: {
    marginTop: 100,
    marginBottom: 100,
    width: "100%",
  },
  tag: {
    borderRadius: 25,
    fontSize: 14,
    color: "#888",
    fontWeight: 400,
    background: "#f4f4f4",
    display: "inline-block",
    padding: "6px 15px",
    float: "right",
    position: "relative",
  },
  bookIcon: {
    width: 25,
    height: 25,
  },
}));

export default useStyles;
