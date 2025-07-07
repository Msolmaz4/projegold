import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  label: {
    display: "flex",
    alignItems: "center",
  },
  labelSmall: {
    color: theme.palette.primary.C200, // #81959F
    fontSize: 13,
    display: "block",
  },
  labelMedium: {
    color: theme.palette.primary.C200,
    fontSize: 15,
    display: "block",
  },
  labelBig: {
    color: theme.palette.primary.C200,
    fontSize: 17,
    display: "block",
  },
  labelMarginBottom: {
    marginBottom: 5,
  },
  marginAfter: {
    marginRight: 15,
  },
}));

export default useStyles;
