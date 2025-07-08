import React from "react";
import { Link } from "react-router-dom";
import { ButtonColor, ButtonSize, ButtonStyle } from "types";
import useStyles from "../styles";

type CustomLinkButtonProps = {
  linkText?: string;
  link: string;
  size?: ButtonSize;
  color?: ButtonColor;
  hoverColor?: ButtonColor;
  style?: ButtonStyle;
  className?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
};

const CustomLinkButton: React.FC<CustomLinkButtonProps> = ({
  linkText,
  link,
  size = "medium",
  color = "blue",
  hoverColor = "blue",
  style = "filled",
  iconBefore,
  iconAfter,
  paddingVertical,
  paddingHorizontal,
  className,
}) => {
  const { classes, cx } = useStyles({
    color,
    size,
    style,
    hoverColor,
  });

  let colorClass;

  if (style === "filled") {
    colorClass = color === "blue" ? classes.filledBlue : classes.filledDefault;
  } else {
    colorClass =
      color === "blue" ? classes.outlinedBlue : classes.outlinedDefault;
  }

  const sizeClass =
    size === "large"
      ? classes.bigSize
      : size === "medium"
        ? classes.mediumSize
        : classes.smallSize;

  return (
    <Link
      style={{
        paddingLeft:
          paddingHorizontal !== "undefined" ? paddingHorizontal : "20px",
        paddingRight:
          paddingHorizontal !== "undefined" ? paddingHorizontal : "20px",
        paddingTop: paddingVertical !== "undefined" ? paddingVertical : "10px",
        paddingBottom:
          paddingVertical !== "undefined" ? paddingVertical : "10px",
      }}
      to={link}
      className={cx(
        className,
        classes.button,
        classes.buttonLink,
        sizeClass,
        colorClass,
      )}
    >
      {iconBefore}
      {linkText}
      {iconAfter}
    </Link>
  );
};

export default CustomLinkButton;
