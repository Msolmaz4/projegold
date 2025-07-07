import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  review: {
    marginBottom: 5,
    marginLeft: 3,
  },
  reviewAverage: {
    color: "#ffb400",
    fontSize: 13,
    marginBottom: 2,
    verticalAlign: "top",
    marginRight: 5,
  },
  reviewCount: {
    color: "#9E9E9E",
    fontSize: 13,
    marginBottom: 2,
    verticalAlign: "top",
    marginLeft: 5,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
}));

export default useStyles;
