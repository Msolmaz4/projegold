import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  cardBox: {},
  card: {
    minWidth: 160,
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    border: "1px solid #ccc",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background-color 0.2s ease-in-out",
    cursor: "pointer",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  cardSameCompany: {
    backgroundColor: "#e3f2fd",
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  },
  notAllowed: {
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  avatar: {
    backgroundColor: "#1976d2",
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  cardContent: {
    padding: 8,
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)" as const,
    width: "90%",
    maxWidth: 600,
    backgroundColor: "#fff",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    padding: 32,
    borderRadius: 16,
    maxHeight: "90vh",
    overflowY: "auto",
  },
}));

export default useStyles;
