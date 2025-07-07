import React from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import useStyles from "./styles";

type CustomMenuItemProps = {
  onClick: () => void;
  menuItemIcon?: React.ReactNode;
  menuItemText?: React.ReactNode;
};

const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
  onClick,
  menuItemIcon,
  menuItemText,
}) => {
  const { classes } = useStyles();

  return (
    <MenuItem className={classes.menuItem} onClick={() => onClick()}>
      {menuItemIcon && (
        <ListItemIcon className={classes.listItemIcon}>
          {menuItemIcon}
        </ListItemIcon>
      )}
      {menuItemText && (
        <ListItemText classes={{ primary: classes.listItemText }}>
          {menuItemText}
        </ListItemText>
      )}
    </MenuItem>
  );
};

export default CustomMenuItem;
