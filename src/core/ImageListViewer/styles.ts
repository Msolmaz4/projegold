import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  thumbWrapper: {
    textAlign: "center",
    marginBottom: 8,
    marginRight: 8,
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  thumb: {
    display: "block",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    padding: 4,
    boxSizing: "border-box",
  },
  thumbInner: {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
    height: "100%",
    position: "relative",
    cursor: "pointer",
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },
  imgPreview: {
    display: "block",
    width: "100%",
    height: "auto",
  },
}));

export default useStyles;
