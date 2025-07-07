import React from "react";
import { Tab, TabProps } from "@mui/material";
import useStyles from "./styles";

interface CustomTabProps extends TabProps {
  tabIcon?: React.ReactNode;
  tabLabel?: React.ReactNode;
}

const CustomTab: React.FC<CustomTabProps> = ({
  tabIcon,
  tabLabel,
  ...props
}) => {
  const { classes } = useStyles();

  return (
    <Tab
      classes={{
        root: classes.tab,
        selected: classes.selectedTab,
      }}
      label={
        <span className={classes.tabLabel}>
          {tabIcon} {tabLabel}
        </span>
      }
      {...props}
    />
  );
};

export default CustomTab;
