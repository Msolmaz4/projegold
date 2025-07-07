import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  baseStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: "50%",
    borderColor: "#afd6de",
    borderStyle: "dashed",
    backgroundColor: "#fafafc",
    color: "#7db7c3",
    outline: "none",
    transition: "border .24s ease-in-out",
    height: 150,
    width: 150,
    justifyContent: "center",
    overflow: "hidden",
    cursor: "pointer",
    "& p": {
      textAlign: "center",
    },
    "& img": {
      minWidth: "150px",
      minHeight: "150px",
      maxHeight: "150px",
      maxWidth: "150px",
    },
  },
  activeStyle: {
    borderColor: "#2196f3",
  },
  acceptStyle: {
    borderColor: "#00e676",
  },
  rejectStyle: {
    borderColor: "#ff1744",
  },
  dropZoneContainer: {},
  dropZone: {},
  uploadingIcon: {
    display: "flex",
    margin: 0,
    justifyContent: "center",
    color: theme.palette.primary.main,
    position: "absolute",
  },
}));

export default useStyles;
