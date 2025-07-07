import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "editButton">()(
  (_theme, _params, classes) => ({
    editForm: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
    },
    rowActions: {
      transition: "0.4s",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
    },
    visibleOnHover: {
      [`&:hover .${classes.editButton}`]: {
        opacity: "1 !important",
        transition: "0.4s",
      },
    },
    permanentVisible: {
      opacity: 1,
    },
    editButton: {
      padding: 9,
      opacity: 0,
      transition: "0.4s",
    },
    editIcon: {
      width: 23,
      height: 23,
    },
    doneButton: {
      padding: 5,
      color: "#5dbf62",
      backgroundColor: "#f0f9f4",
      "&:hover": {
        backgroundColor: "#e4f4e3",
      },
    },
    doneIcon: {
      width: 29,
      height: 29,
    },
  }),
);

export default useStyles;
