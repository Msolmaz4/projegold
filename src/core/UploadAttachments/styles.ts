import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "attachmentButtonIcon" | "buttonError">()(
  (theme, _params, classes) => ({
    baseStyle: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      borderWidth: 3,
      borderRadius: 15,
      borderColor: "transparent",
      borderStyle: "dashed",
      outline: "none",
      transition: "border .24s ease-in-out",
      position: "relative",
    },
    activeStyle: {
      borderColor: "#afd6de",
      backgroundColor: "#fafafc",
    },
    acceptStyle: {
      borderColor: "#00e676",
      backgroundColor: "#fafafc",
    },
    rejectStyle: {
      borderColor: "#ff1744",
      backgroundColor: "#fafafc",
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
    },

    thumb: {
      display: "block",
      borderRadius: 2,
      border: "1px solid hsl(0, 0%, 80%)",
      width: 240,
      height: 40,
      padding: 4,
      boxSizing: "border-box",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.02)",
      },
    },

    thumbInner: {
      display: "flex",
      minWidth: 0,
      overflow: "hidden",
      height: "100%",
      position: "relative",
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

    attachmentOverlay: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      msTransform: "translate(-50%, -50%)",
      textAlign: "center",
      backgroundColor: "rgba(220, 230, 232, 0.2)",
      backdropFilter: "blur(3px);",
      color: "#5a9eac",
      fontSize: 17,
      fontWeight: 500,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      width: "100%",
      height: "100%",
      zIndex: 999,
    },
    attachmentIcon: {
      width: 55,
      height: 55,
      color: "#5a9eac",
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

    removeAttachment: {
      padding: 2,
      color: "#e6ebed",
      borderRadius: 0,
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
      },
    },
    removeIcon: {
      width: 25,
      height: 25,
      color: "hsl(0, 0%, 80%)",
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
    buttonError: {},
    button: {
      border: "2px solid " + theme.palette.primaryGrey.C100,
      "&:hover": {
        backgroundColor: "rgba(51, 51, 51, 0.02)",
      },
      [`&.${classes.buttonError}`]: {
        border: "2px solid " + theme.palette.red.main,
      },
    },
    buttonText: {
      borderLeft: "2px solid " + theme.palette.primaryGrey.C100,
      paddingLeft: 10,
      marginLeft: 10,
      fontSize: 14,
      [`&.${classes.buttonError}`]: {
        borderLeft: "2px solid " + theme.palette.red.main,
      },
    },
    attachmentButtonIcon: {
      width: 23,
      height: 23,
      color: theme.palette.primary.main,
    },
    focusVisible: {
      border: "2px solid #e8e6bf",
      [`& .${classes.attachmentButtonIcon}`]: {
        color: "#aaa661",
      },
    },
    attachmentIconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      overflow: "hidden",
    },
    attachmentName: {
      fontSize: 14,
      lineHeight: "30px",
      maxWidth: 160,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginLeft: 5,
    },
    iconWrapper: {
      width: 30,
      marginLeft: 5,
    },
    attachmentsWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    buttonWrapper: {},
  })
);

export default useStyles;
