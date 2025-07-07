import { makeStyles } from "tss-react/mui";

type StyleProps = {
  color: string;
};

const useStyles = makeStyles<StyleProps>()((_, { color }) => ({
  colorView: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: color,
  },
  colorSwatch: {
    display: "block",
    width: 40,
    height: 24,
    borderRadius: 4,
    backgroundColor: color,
    cursor: "pointer",
    border: "none",
  },
}));

export default useStyles;
