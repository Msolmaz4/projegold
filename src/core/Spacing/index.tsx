import React from "react";
import useStyles from "./styles";

type SpacingProps = {
  height: number | string;
};

const Spacing: React.FC<SpacingProps> = ({ height }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.spacing} style={{ height }}>
      {" "}
    </div>
  );
};

export default Spacing;
