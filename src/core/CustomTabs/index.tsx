import React from "react";
import { Tabs } from "@mui/material";
import useStyles from "./styles";

type CustomTabsProps = {
  selectedTab: number;
  setSelectedTab: (value: React.SetStateAction<number>) => void;
  children: React.ReactNode;
};

const CustomTabs: React.FC<CustomTabsProps> = ({
  selectedTab,
  setSelectedTab,
  children,
}) => {
  const { classes } = useStyles();

  return (
    <Tabs
      value={selectedTab}
      classes={{
        indicator: classes.tabIndicator,
        root: classes.root,
        flexContainer: classes.flexContainer,
      }}
      onChange={(_: React.ChangeEvent<unknown>, newValue: number) =>
        setSelectedTab(newValue)
      }
      variant="scrollable"
      scrollButtons="auto"
    >
      {children}
    </Tabs>
  );
};

export default CustomTabs;
