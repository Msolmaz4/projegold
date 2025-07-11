import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginX: "auto",
    marginTop: theme.spacing(5),
  },
  companyBox: {
    marginBottom: theme.spacing(3),
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    cursor: "pointer",
  },
  companyHeader: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    width: 160,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressText: {
    width: 50,
    textAlign: "right",
  },
  remainingBox: {
    width: 60,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  remainingCaption: {
    textTransform: "lowercase",
    fontSize: 10,
    marginBottom: theme.spacing(0.5),
  },
  taskBox: {
    padding: theme.spacing(1),
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
  },
  userSelectBox: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: "1px solid #ddd",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
}));

export default useStyles;
