import React from "react";
import useStyles from "./styles";

type ColorViewProps = {
  color: string;
};

const ColorView: React.FC<ColorViewProps> = ({ color }) => {
  const { classes } = useStyles({ color });

  return (
    <div className={classes.colorView}>
      <div className={classes.colorSwatch}>&nbsp;</div>
      <div>{color}</div>
    </div>
  );
};

export default ColorView;
