import React from "react";
import { Grid2 } from "@mui/material";
import ColorSwatch from "../ColorSwatch";
import useStyles from "./styles";

type ColorSwatchGroupProps = {
  onSelect: (color: string) => void;
  colorName: string;
  colors: string[];
};

const ColorSwatchGroup: React.FC<ColorSwatchGroupProps> = ({
  onSelect,
  colorName,
  colors,
}) => {
  const { classes } = useStyles();

  return (
    <Grid2 size={1.5} container direction="column" spacing={1}>
      <Grid2>
        <span className={classes.colorGroupLabel}>{colorName}</span>
      </Grid2>
      <Grid2 container direction="column" spacing={0}>
        {colors.map((color, index) => (
          <Grid2 key={color}>
            <ColorSwatch
              color={color}
              isFirst={index === 0}
              isLast={index === colors.length - 1}
              onSelect={onSelect}
            />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
};

export default ColorSwatchGroup;
