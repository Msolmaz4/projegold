import React from "react";
import { Tooltip, TooltipProps } from "@mui/material";
import useStyles from "./styles";

interface CustomTooltipProps extends TooltipProps {
  title: NonNullable<React.ReactNode>;
  children: React.ReactElement<any, any>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, children }) => {
  const { classes } = useStyles();

  return (
    <Tooltip title={title} classes={{ tooltip: classes.tooltip }}>
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
