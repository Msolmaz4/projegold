import { makeStyles } from "tss-react/mui";

type StyleProps = {
  color: string;
  isFirst?: boolean;
  isLast?: boolean;
};

const useStyles = makeStyles<StyleProps>()((_, { color, isFirst, isLast }) => ({
  colorSwatch: {
    display: "block",
    width: 40,
    height: 24,
    borderTopLeftRadius: isFirst ? 3 : 0,
    borderTopRightRadius: isFirst ? 3 : 0,
    borderBottomLeftRadius: isLast ? 3 : 0,
    borderBottomRightRadius: isLast ? 3 : 0,
    backgroundColor: color,
    cursor: "pointer",
    marginBottom: isLast ? 0 : 3,
    border: "none",
  },
}));

export default useStyles;
