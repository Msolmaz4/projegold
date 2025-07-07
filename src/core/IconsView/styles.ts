import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "icon">()((theme, _params, classes) => ({
  iconsView: {
    marginBottom: 50,
  },
  listTitle: {
    marginBottom: 30,
  },
  iconList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flexDirection: "row",
    display: "flex",
  },
  iconListElement: {
    listStyle: "none",
    float: "left",
    margin: 0,
    paddingBottom: "1rem",
    width: "calc(100%/12)",
    display: "inline-block",
  },
  iconListElementContent: {
    position: "relative",
    transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
    transform: "translateZ(0)",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    borderRadius: ".25rem",
    "::after": {
      content: '""',
      boxShadow: "0 .25rem .125rem 0 rgba(0,0,0,0.05)",
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
      transition: "opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
    },
    "&:hover::after": {
      opacity: 1,
    },
    "&:focus::after": {
      opacity: 1,
    },
    "&:hover": {
      cursor: "default",
      backgroundColor: "#fff",
    },
    "&:focus": {
      cursor: "default",
      backgroundColor: "#fff",
    },
  },
  iconView: {
    minHeight: "4rem",
    padding: ".5rem",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    borderTopLeftRadius: ".25rem",
    borderTopRightRadius: ".25rem",
    color: "inherit",
    "&:hover": {
      backgroundColor: "#495057",
    },
    [`&:hover .${classes.icon}`]: {
      color: "#fff",
    },
  },
  iconNameWrapper: {
    fontSize: ".8rem",
    textAlign: "center",
    padding: ".5rem .25rem",
    width: "100%",
  },
  iconName: {
    color: "#adb5bd",
    userSelect: "all",
    WebkitUserSelect: "all",
    display: "block",
  },
  icon: {
    fontSize: 33,
    color: "#495057",
  },
  iconCount: {
    fontSize: 17,
    color: theme.palette.text.secondary,
    fontWeight: 400,
    marginLeft: 15,
  },
  dropDownIconWrapper: {
    padding: 0,
    height: 47,
    float: "right",
  },
  dropDownIcon: {
    color: "#495057",
    height: 23,
    width: 23,
    marginLeft: 12,
    marginRight: 12,
    marginTop: -2,
    verticalAlign: "middle",
    transition: "all 0.3s ease",
    "& path": {
      strokeWidth: 1.5,
    },
  },
  dropDownIconExpanded: {
    transform: "rotate(180deg)",
  },
}));

export default useStyles;
