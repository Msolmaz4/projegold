import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  pdfWrapper: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  pdf: {
    textAlign: "center",
    marginBottom: 8,
    marginRight: 8,
  },
}));

export default useStyles;
