import React from "react";
import { Link } from "react-router-dom";
import useStyles from "../styles";

type CustomLinkProps = {
  linkText?: React.ReactNode;
  link: string;
  linkColor?: "blue" | "darkblue" | "default";
  target?: "_blank" | "_self" | "_parent" | "_top";
  className?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  nowrap?: boolean;
};

const CustomLink: React.FC<CustomLinkProps> = ({
  linkText,
  link,
  linkColor = "default",
  target,
  iconBefore,
  iconAfter,
  className,
  nowrap = true,
}) => {
  const { classes, cx } = useStyles({});

  return (
    <Link
      to={link}
      className={cx(
        className,
        classes.link,
        linkColor === "blue"
          ? classes.linkBlue
          : linkColor === "darkblue"
            ? classes.linkDarkBlue
            : classes.linkDefault,
        nowrap ? classes.linkNowrap : null,
      )}
      target={target}
    >
      {iconBefore}
      {linkText}
      {iconAfter}
    </Link>
  );
};

export default CustomLink;
