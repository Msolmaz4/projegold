import React, { useEffect, useState } from "react";
import { Avatar, Badge, CircularProgress, Typography } from "@mui/material";
import { useAuthContext } from "hooks";
import { S3Resource } from "types";
import utils from "utils";
import useStyles from "./styles";

type CustomAvatarProps = {
  s3Resource?: S3Resource | null;
  alternativeImage?: string;
  showBadge: boolean;
  rootClass?: string;
  rootMargin?: boolean;
  badgeType?: "text" | "dot";
  badgeRootClass?: string;
  badgeContent?: React.ReactNode;
  size: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const CustomAvatarComponent: React.ForwardRefRenderFunction<
  any,
  CustomAvatarProps
> = (
  {
    s3Resource,
    alternativeImage,
    showBadge,
    rootClass,
    rootMargin = true,
    badgeType = "text",
    badgeRootClass,
    badgeContent,
    size,
    onClick,
  },
  customAvatarRef,
) => {
  const { classes, cx } = useStyles();
  const authContext = useAuthContext();

  const [avatar, setAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!alternativeImage && !s3Resource) {
      setAvatar("/img/no-image.svg");
      setLoading(false);
    } else if (alternativeImage && !s3Resource) {
      setAvatar(alternativeImage);
      setLoading(false);
    } else {
      if (s3Resource === undefined || s3Resource === null) {
        return;
      }
      const image = utils.images.getImage(s3Resource, 500, 500);
      console.log("image result: ", image);
      setAvatar(image);
      setLoading(false);
    }
    return () => {
      setLoading(false);
    };
  }, [authContext, s3Resource, alternativeImage]);

  return (
    <div
      ref={customAvatarRef}
      className={cx(
        rootClass || classes.root,
        rootMargin ? classes.rootMargin : "",
        onClick ? classes.clickable : "",
      )}
    >
      {showBadge ? (
        <Badge
          overlap="circular"
          onClick={(e) => (onClick ? onClick(e) : {})}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          classes={{ badge: badgeRootClass || classes.badgeRoot }}
          badgeContent={
            // <Avatar classes={{root: classes.badgeRoot}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            badgeType === "text" ? (
              <Typography
                className={classes.badgeText}
                variant="caption"
                component="div"
                color="textSecondary"
              >
                {badgeContent}
              </Typography>
            ) : (
              badgeContent
            )
          }
        >
          {loading ? (
            <div
              className={classes.avatarLoading}
              style={{ width: size ? size : 100, height: size ? size : 100 }}
            >
              <CircularProgress size={24} className={classes.buttonProgress} />
            </div>
          ) : (
            <Avatar
              classes={{ root: classes.avatarRoot }}
              src={avatar}
              style={{ width: size ? size : 100, height: size ? size : 100 }}
            />
          )}
        </Badge>
      ) : loading ? (
        <div
          className={classes.avatarLoading}
          style={{ width: size ? size : 100, height: size ? size : 100 }}
        >
          <CircularProgress size={24} className={classes.buttonProgress} />
        </div>
      ) : (
        <Avatar
          classes={{ root: classes.avatarRoot }}
          onClick={(e) => (onClick ? onClick(e) : {})}
          src={avatar}
          style={{ width: size ? size : 100, height: size ? size : 100 }}
        />
      )}
    </div>
  );
};

export default React.forwardRef(CustomAvatarComponent);
