import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  customMenu: {
    display: "flex",
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    color: theme.palette.primary.main,
  },
  menuButtonSmall: {
    "& svg": {
      width: 33,
      height: 33,
    },
    padding: 5,
    borderRadius: 10,
  },
  menuButtonMedium: {
    "& svg": {
      width: 39,
      height: 39,
    },
    padding: 5,
    borderRadius: 15,
  },
  menuButtonBig: {
    "& svg": {
      width: 39,
      height: 39,
    },
    padding: 5,
    borderRadius: 15,
  },
  menuButtonTextLeft: {
    marginRight: 1,
  },
  menuButtonTextRight: {
    marginLeft: 1,
  },
  popper: {
    zIndex: 1111,
  },
  bottomEnd: {
    marginTop: 15,
  },
}));

export default useStyles;
