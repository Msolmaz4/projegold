import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "listItemIcon" | "listItemText">()(
  (theme, _params, classes) => ({
    menuItem: {
      [`&:hover .${classes.listItemIcon}`]: {
        color: theme.palette.primary.dark,
      },
      [`&:hover .${classes.listItemText}`]: {
        color: theme.palette.primary.dark,
      },
    },
    listItemIcon: {
      color: theme.palette.primary.main,
      minWidth: 45,
      "& svg": {
        width: 27,
        height: 27,
      },
    },
    listItemText: {},
  })
);

export default useStyles;
