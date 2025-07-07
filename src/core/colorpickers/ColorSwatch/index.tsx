import React from "react";
import useStyles from "./styles";

type ColorSwatchProps = {
  onSelect: (color: string) => void;
  color: string;
  isFirst?: boolean;
  isLast?: boolean;
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  onSelect,
  color,
  isFirst,
  isLast,
}) => {
  const { classes } = useStyles({
    color,
    isFirst,
    isLast,
  });

  return (
    <button className={classes.colorSwatch} onClick={() => onSelect(color)}>
      &nbsp;
    </button>
  );
};

export default ColorSwatch;
