import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  optionValue: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  placeholder: {
    display: "inline-block",
    minWidth: "max-content",
  },
}));

export default useStyles;
