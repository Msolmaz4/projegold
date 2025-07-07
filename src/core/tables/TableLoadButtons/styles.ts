import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  loadMoreButton: {
    marginTop: 33,
    marginBottom: 33,
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
