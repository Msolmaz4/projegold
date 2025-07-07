import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemsCount: {
    marginRight: 20,
  },
}));

export default useStyles;
