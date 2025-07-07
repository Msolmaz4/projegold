import React from "react";
import useStyles from "./styles";

type CustomTagProps = {
  content: string;
  tagSize?: "xsmall" | "small" | "medium" | "big";
  tagColor?:
    | "grey"
    | "yellow"
    | "indigo"
    | "blue"
    | "lightblue"
    | "teal"
    | "purple"
    | "amber"
    | "white"
    | "red"
    | "orange"
    | "green"
    | "darkgreen";
  tagStyle?: "filled" | "filledoutlined" | "outlined";
  accent?: "saturated" | "flat" | "pale";
  textColor?: "default" | "dark" | "light";
  rootClassName?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  style?: React.CSSProperties;
};

const CustomTag: React.FC<CustomTagProps> = ({
  content,
  tagSize = "medium",
  tagColor,
  tagStyle = "filledoutlined",
  accent = "pale",
  textColor = "default",
  rootClassName,
  paddingVertical,
  paddingHorizontal,
  style,
}) => {
  const { classes, cx } = useStyles();

  const colorClass =
    tagColor === "blue"
      ? classes.blue
      : tagColor === "indigo"
        ? classes.indigo
        : tagColor === "lightblue"
          ? classes.lightblue
          : tagColor === "teal"
            ? classes.teal
            : tagColor === "purple"
              ? classes.purple
              : tagColor === "amber"
                ? classes.amber
                : tagColor === "red"
                  ? classes.red
                  : tagColor === "orange"
                    ? classes.orange
                    : tagColor === "white"
                      ? classes.white
                      : tagColor === "yellow"
                        ? classes.yellow
                        : tagColor === "grey"
                          ? classes.grey
                          : tagColor === "green"
                            ? classes.green
                            : tagColor === "darkgreen"
                              ? classes.darkgreen
                              : classes.default;

  const accentClass =
    accent === "saturated"
      ? classes.saturated
      : accent === "flat"
        ? classes.flat
        : classes.pale;

  const styleClass =
    tagStyle === "filled"
      ? classes.filled
      : tagStyle === "filledoutlined"
        ? classes.filledOutlined
        : classes.outlined;

  const textColorClass =
    textColor === "light"
      ? classes.textLight
      : textColor === "dark"
        ? classes.textDark
        : classes.textDefault;

  const sizeClass =
    tagSize === "big"
      ? classes.bigSize
      : tagSize === "medium"
        ? classes.mediumSize
        : tagSize === "xsmall"
          ? classes.xsmallSize
          : classes.smallSize;

  return (
    <span
      className={cx(
        classes.tag,
        textColorClass,
        sizeClass,
        colorClass,
        accentClass,
        styleClass,
        rootClassName,
      )}
      style={{
        paddingLeft:
          paddingHorizontal !== "undefined" ? paddingHorizontal : "20px",
        paddingRight:
          paddingHorizontal !== "undefined" ? paddingHorizontal : "20px",
        paddingTop: paddingVertical !== "undefined" ? paddingVertical : "10px",
        paddingBottom:
          paddingVertical !== "undefined" ? paddingVertical : "10px",
        ...style,
      }}
    >
      {content}
    </span>
  );
};

export default CustomTag;
