import React from "react";
import { Typography } from "@mui/material";
import { TypographyProps } from "types";
import { NotAvailable } from "components";
import useStyles from "./styles";

const CustomTypography: React.FC<TypographyProps> = ({
  content,
  size = "small",
  color = "default",
  accent = "pale",
  variant = "body1",
  bold = false,
  italic = false,
  underline = false,
}) => {
  const { classes, cx } = useStyles();

  const colorClass =
    color === "blue"
      ? classes.blue
      : color === "red"
        ? classes.red
        : color === "orange"
          ? classes.orange
          : color === "white"
            ? classes.white
            : color === "yellow"
              ? classes.yellow
              : color === "grey"
                ? classes.grey
                : color === "green"
                  ? classes.green
                  : classes.default;

  const accentClass =
    accent === "saturated"
      ? classes.saturated
      : accent === "flat"
        ? classes.flat
        : classes.pale;

  const labeledTypographyClass =
    size === "xsmall"
      ? classes.labeledTypographyXSmall
      : size === "small"
        ? classes.labeledTypographySmall
        : size === "large"
          ? classes.labeledTypographyLarge
          : classes.labeledTypographyMedium;

  return (
    <Typography
      variant={variant}
      className={cx(
        labeledTypographyClass,
        colorClass,
        accentClass,
        underline ? classes.underline : "",
        bold ? classes.bold : "",
        italic ? classes.italic : "",
      )}
    >
      {content === undefined || content === null || content === "" ? (
        <NotAvailable />
      ) : (
        content
      )}
    </Typography>
  );
};

export default CustomTypography;
