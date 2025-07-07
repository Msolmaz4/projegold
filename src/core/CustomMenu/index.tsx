import React, { useRef, useState } from "react";
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuList,
  Paper,
  Popper,
  PopperPlacementType,
  Typography,
} from "@mui/material";
import { MenuDotsIcon } from "icons";
import useStyles from "./styles";

type CustomMenuProps = {
  children(closeMenu: () => void): React.ReactNode;
  menuButtonRootClass?: string;
  menuIcon?: React.ReactNode;
  menuIconSize?: "small" | "medium" | "big";
  menuPlacement?: PopperPlacementType;
  menuTextPosition?: "right" | "left";
  menuText?: string;
  menuTextClassName?: string;
};

const CustomMenu: React.FC<CustomMenuProps> = ({
  children,
  menuButtonRootClass,
  menuIcon = <MenuDotsIcon />,
  menuIconSize = "medium",
  menuPlacement = "bottom-end",
  menuTextPosition = "left",
  menuText,
  menuTextClassName,
}) => {
  const { classes, cx } = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef<boolean>(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.customMenu}>
      {menuText && menuTextPosition === "left" && (
        <Typography
          className={cx(menuTextClassName, classes.menuButtonTextLeft)}
        >
          {menuText}
        </Typography>
      )}
      <IconButton
        ref={anchorRef}
        className={cx(
          menuButtonRootClass || classes.menuButton,
          menuIconSize === "small"
            ? classes.menuButtonSmall
            : menuIconSize === "big"
              ? classes.menuButtonBig
              : classes.menuButtonMedium,
        )}
        onClick={handleToggle}
      >
        {menuIcon}
      </IconButton>
      {menuText && menuTextPosition === "right" && (
        <Typography
          className={cx(menuTextClassName, classes.menuButtonTextRight)}
        >
          {menuText}
        </Typography>
      )}
      <Popper
        className={cx(classes.popper, classes.bottomEnd)}
        open={open}
        anchorEl={anchorRef.current}
        placement={menuPlacement}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {children(closeMenu)}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CustomMenu;
