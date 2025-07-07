import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  loadingProgress: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    marginLeft: 15,
  },
}));

export default useStyles;
