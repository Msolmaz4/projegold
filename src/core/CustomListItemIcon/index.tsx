import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  CloseIcon,
  DoneAllIcon,
  RadioButtonUncheckedOutlinedIcon,
} from "icons";
import useStyles from "./styles";

type CustomListItemIconProps = {
  isActive: boolean;
  listItemTextLine1: string;
  listItemTextLine2: string;
  listItemClass: string;
  inactiveIcon: "unchecked" | "close";
};

const CustomListItemIcon: React.FC<CustomListItemIconProps> = ({
  isActive,
  listItemTextLine1,
  listItemTextLine2,
  listItemClass,
  inactiveIcon,
}) => {
  const { classes } = useStyles();

  return (
    <ListItem className={listItemClass || classes.listItem}>
      <ListItemIcon
        className={
          isActive ? classes.listItemIconActive : classes.listItemIconInActive
        }
      >
        {isActive ? (
          <DoneAllIcon className={classes.icon} />
        ) : inactiveIcon === "close" ? (
          <CloseIcon className={classes.icon} />
        ) : (
          <RadioButtonUncheckedOutlinedIcon className={classes.icon} />
        )}
      </ListItemIcon>
      <ListItemText
        className={
          isActive ? classes.listItemTextActive : classes.listItemTextInActive
        }
      >
        {listItemTextLine1}
        <br className={classes.listItemTextLineBreak} />
        {listItemTextLine2}
      </ListItemText>
    </ListItem>
  );
};

export default CustomListItemIcon;
