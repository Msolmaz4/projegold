import React, { useState } from "react";
import { Collapse, IconButton } from "@mui/material";
import { ArrowIcon } from "icons";
import useStyles from "./styles";

type IconsViewProps = {
  title: string;
  icons: string[];
  iconSearch: string;
};

const IconsView: React.FC<IconsViewProps> = ({ title, icons, iconSearch }) => {
  const { classes, cx } = useStyles();

  const iconList =
    iconSearch.trim() === ""
      ? icons
      : icons.filter((icon) => icon.includes(iconSearch));

  const [collapseOpen, setCollapseOpen] = useState<boolean>(true);

  return (
    <div className={classes.iconsView}>
      <h2 className={classes.listTitle}>
        {title}
        <span className={classes.iconCount}>
          (
          {iconSearch.trim() === ""
            ? icons.length
            : iconList.length + "/" + icons.length}
          )
        </span>
        <IconButton
          className={classes.dropDownIconWrapper}
          onClick={() => setCollapseOpen((prev) => !prev)}
        >
          <ArrowIcon
            className={cx(
              classes.dropDownIcon,
              collapseOpen ? classes.dropDownIconExpanded : "",
            )}
          />
        </IconButton>
      </h2>
      <Collapse in={collapseOpen}>
        {iconList.length ? (
          <ul className={classes.iconList}>
            {iconList.map((icon, index) => (
              <li key={index} className={classes.iconListElement}>
                <div className={classes.iconListElementContent}>
                  <div className={classes.iconView}>
                    <i className={cx(icon, classes.icon)}></i>
                  </div>
                  <div className={classes.iconNameWrapper}>
                    <span className={classes.iconName}>{icon}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          "Keine Icons gefunden"
        )}
      </Collapse>
    </div>
  );
};

export default IconsView;
