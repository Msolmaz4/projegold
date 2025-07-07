import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "avatarRoot">()(
  (theme, _params, classes) => ({
    root: {
      display: "flex",
    },
    rootMargin: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    badgeRoot: {
      backgroundColor: "#fafafa",
      border: "1px solid #63bbcf",
      minWidth: 30,
      height: 30,
      borderRadius: 15,
    },
    badgeText: {
      fontSize: 14,
      fontWeight: 500,
      color: "#63bbcf",
    },
    buttonProgress: {
      color: "#4caf50",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
      "&:hover": {
        boxShadow: "none",
      },
    },
    clickable: {
      cursor: "pointer",
      [`&:hover .${classes.avatarRoot}`]: {
        border: "3px solid #e6eaed",
      },
    },
    avatarRoot: {
      border: "3px solid #f2f5f7",
    },
    avatarLoading: {
      backgroundColor: "#f2f2f2",
      borderRadius: "50px",
    },
  }),
);

export default useStyles;
