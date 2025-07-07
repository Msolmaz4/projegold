import React from "react";
import { CircularProgress } from "@mui/material";
import useStyles from "./styles";

type LoadingProps = {
  description?: React.ReactNode;
  className?: string;
  size?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
};

const Loading: React.FC<LoadingProps> = ({
  description,
  className,
  size,
  align = "center",
  style,
}) => {
  const { classes, cx } = useStyles();
  return (
    <div
      style={{
        justifyContent:
          align === "left"
            ? "flex-start"
            : align === "right"
              ? "flex-end"
              : "center",
        marginTop: 50,
        marginLeft: 30,
        marginBottom: 30,
        ...style,
      }}
      className={cx(className ? className : null, classes.loadingProgress)}
    >
      <CircularProgress aria-describedby="loading" size={size} />
      {description && <div className={classes.description}>{description}</div>}
    </div>
  );
};

export default Loading;
