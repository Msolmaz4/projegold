// En üste ekle
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => ({
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: "#1976d2",
  },
  selectedCard: {
    border: "2px solid #1976d2",
  },
  unselectedCard: {
    border: "1px solid #ccc",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  milestoneText: {
    marginBottom: 8,
  },
  paper: {
    padding: 24,
    marginBottom: 32,
  },
}));

export default useStyles;
