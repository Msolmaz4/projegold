import React from "react";
import { Collapse, IconButton } from "@mui/material";
import { ArrowIcon, ChangeHistoryIcon } from "icons";
import useStyles from "./styles";

type CustomActivityItemProps = {
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  icon?: React.ReactNode;
  header: React.ReactNode;
  children?: React.ReactNode;
};

const CustomActivityItem: React.FC<CustomActivityItemProps> = ({
  label,
  subLabel,
  icon = <ChangeHistoryIcon />,
  header,
  children,
}) => {
  const { classes, cx } = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className={cx(classes.activityItem)}>
      <div className={classes.activityItemLabel}>
        {label}
        {subLabel && (
          <>
            <br />
            <span className={classes.activityItemSubLabel}>{subLabel}</span>
          </>
        )}
      </div>
      <div className={classes.activityItemIcon}>{icon}</div>
      <div className={classes.activityItemContent}>
        <div className={classes.activityItemHeader}>
          {header}
          {children && (
            <IconButton
              onClick={() => setOpen((prev) => !prev)}
              className={cx(
                classes.bodyOpenButton,
                open ? classes.bodyOpenButtonExpanded : "",
              )}
            >
              <ArrowIcon />
            </IconButton>
          )}
        </div>
        {children && (
          <Collapse in={open} className={classes.activityItemBody}>
            {children}
          </Collapse>
        )}
      </div>
    </div>
  );
};

export default CustomActivityItem;
