// styles.ts
// src/styles/useStyles.ts
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  rootBox: {
    padding: theme.spacing(2),
  },
  addButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  noCategoriesText: {
    margin: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  cardHeaderTitle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    fontWeight: 600,
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listItemText: {
    fontWeight: 500,
    "&:hover": {
      fontWeight: 700,
      textDecoration: "underline",
    },
  },
  addSubButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;
