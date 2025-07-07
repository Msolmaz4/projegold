import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "removeImage">()(
  (theme, _params, classes) => ({
    baseStyle: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#afd6de",
      borderStyle: "dashed",
      backgroundColor: "#fafafc",
      color: "#7db7c3",
      outline: "none",
      transition: "border .24s ease-in-out",
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
    thumbWrapper: {
      textAlign: "center",
      marginBottom: 8,
      marginRight: 8,
    },

    thumbsContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 16,
    },

    thumb: {
      display: "block",
      borderRadius: 2,
      border: "1px solid #eaeaea",
      width: 150,
      height: 150,
      padding: 4,
      boxSizing: "border-box",
    },

    thumbInner: {
      display: "flex",
      minWidth: 0,
      overflow: "hidden",
      height: "100%",
      position: "relative",
      cursor: "pointer",
    },

    img: {
      display: "block",
      width: "auto",
      height: "100%",
    },

    imgPreview: {
      display: "block",
      width: "100%",
      height: "auto",
    },

    imageOverlay: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      msTransform: "translate(-50%, -50%)",
      textAlign: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      [`&:hover .${classes.removeImage}`]: {
        visibility: "visible",
        opacity: "1",
      },
    },

    waitingIcon: {
      width: 20,
      height: 20,
      color: "#e6ebed",
    },
    doneIcon: {
      color: "#85d142",
      width: 22,
      height: 22,
    },
    uploadingIcon: {
      display: "flex",
      margin: 0,
      justifyContent: "center",
      color: theme.palette.red.main,
    },
    processingIcon: {
      display: "flex",
      margin: 0,
      justifyContent: "center",
      color: "#e6ebed",
    },

    removeImage: {
      position: "absolute",
      right: 1,
      top: 1,
      padding: 0,
      color: "#e6ebed",
      visibility: "hidden",
      opacity: "0",
      transition: "visibility 0s, opacity 0.7s linear",
      paddingBottom: 3,
      paddingLeft: 3,
    },
    removeIcon: {
      width: 25,
      height: 25,
    },
    deleteButton: {
      marginTop: 5,
      display: "inline-block",
      padding: "5px 8px",
      "& svg": {
        color: "#cc7e7e",
        width: 25,
        height: 25,
      },
      "&:hover svg": {
        color: "#cc6868",
      },
    },
    saveInfo: {
      color: theme.palette.accent.main,
    },
    dropZoneContainer: {},
    dropZone: {},
    inputError: {
      color: theme.palette.red.main,
    },
  })
);

export default useStyles;
