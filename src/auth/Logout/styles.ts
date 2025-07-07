import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  content: {
    paddingTop: theme.spacing(4),
  },
  heading: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(3),
  },
}));

export default useStyles;
