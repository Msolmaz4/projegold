import React from "react";
import { Button } from "@mui/material";
import { ButtonColor, ButtonSize } from "types";
import useStyles from "../styles";

type CustomTextButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  size?: ButtonSize;
  color?: ButtonColor;
  hoverColor?: ButtonColor;
  align?: "left" | "center" | "right";
  rootClassName?: string;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  marginTop?: number;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  accessKey?: string | undefined;
};

const CustomTextButton: React.FC<CustomTextButtonProps> = ({
  text,
  onClick,
  size = "medium",
  color,
  hoverColor = color,
  align = "left",
  rootClassName,
  marginLeft,
  marginRight,
  marginBottom,
  marginTop,
  iconBefore,
  iconAfter,
  disabled = false,
  type = "button",
  accessKey,
}) => {
  const { classes, cx } = useStyles({
    size,
    color,
    hoverColor,
  });

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick(e);
  };

  const colorClass = disabled
    ? classes.disabledButton
    : color === "blue"
      ? classes.textBlue
      : color === "red"
        ? classes.textRed
        : color === "flatRed"
          ? classes.textFlatRed
          : color === "white"
            ? classes.textWhite
            : color === "yellow"
              ? classes.textYellow
              : color === "grey"
                ? classes.textGrey
                : color === "green"
                  ? classes.textGreen
                  : classes.textDefault;

  const sizeClass =
    size === "large"
      ? classes.textBigSize
      : size === "medium"
        ? classes.textMediumSize
        : classes.textSmallSize;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginLeft,
        marginRight,
        marginBottom,
        marginTop,
        textAlign: align,
      }}
      className={rootClassName}
    >
      <Button
        disabled={disabled}
        onClick={onClickHandler}
        classes={{
          root: cx(classes.textButton, sizeClass, colorClass),
          focusVisible: classes.focusVisible,
        }}
        type={type}
        accessKey={accessKey}
        focusVisibleClassName={classes.focusVisible}
      >
        {iconBefore && (
          <span className={classes.iconBeforeWrapper}>{iconBefore}</span>
        )}
        <span className={classes.textContent}>{text}</span>
        {iconAfter && (
          <span className={classes.iconAfterWrapper}>{iconAfter}</span>
        )}
      </Button>
    </div>
  );
};

export default CustomTextButton;
