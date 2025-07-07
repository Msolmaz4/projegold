import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  | "leftSpacingNone"
  | "leftSpacingSmall"
  | "leftSpacingMedium"
  | "leftSpacingLarge"
  | "headerSpacingSmall"
  | "headerSpacingMedium"
  | "headerSpacingLarge"
  | "cellSpacingSmall"
  | "cellSpacingMedium"
  | "cellSpacingLarge"
  | "selected"
>()((theme, _params, classes) => ({
  leftSpacingNone: {},
  leftSpacingSmall: {},
  leftSpacingMedium: {},
  leftSpacingLarge: {},
  headerSpacingSmall: {},
  headerSpacingMedium: {},
  headerSpacingLarge: {},
  cellSpacingSmall: {},
  cellSpacingMedium: {},
  cellSpacingLarge: {},
  reactTable: {
    width: "100%",
    color: "#3F4254",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    "& thead tr": {
      fontWeight: 600,
      fontSize: "0.9rem",
      textTransform: "uppercase",
      letterSpacing: "0.1rem",
    },
    "& thead th": {
      borderTop: 0,
      fontWeight: 600,
      color: "#83838A !important",
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "1px",
      verticalAlign: "middle",
      borderBottomWidth: 1,
      paddingTop: 12,
      paddingBottom: 12,
      outline: "none",
      padding: 10,
      textAlign: "inherit",
      lineHeight: "28px",
      whiteSpace: "nowrap",
    },
    "& tbody tr:nth-child(2n)": {
      backgroundColor: "#fafcfc",
    },
    "& tbody tr:first-child td": {
      borderTop: "none",
    },
    [`&.${classes.headerSpacingSmall} thead th`]: {
      padding: 5,
    },
    [`&.${classes.headerSpacingMedium} thead th`]: {
      padding: 10,
    },
    [`&.${classes.headerSpacingLarge} thead th`]: {
      padding: 15,
    },
    [`&.${classes.leftSpacingSmall} thead th:first-child`]: {
      paddingLeft: 5,
    },
    [`&.${classes.leftSpacingMedium} thead th:first-child`]: {
      paddingLeft: 15,
    },
    [`&.${classes.leftSpacingLarge} thead th:first-child`]: {
      paddingLeft: 30,
    },
    "& thead th:hover .sort-icon": {
      opacity: 1,
    },
    "& thead th.sortable": {
      cursor: "pointer",
    },
    "& thead th.sortable-active": {
      color: theme.palette.primary.main + " !important",
    },
    "& thead th.sortable-active .sort-icon": {
      opacity: 1,
    },
    "& td": {
      verticalAlign: "middle",
      borderTop: "1px solid #eaeaea",
    },
    [`&.${classes.cellSpacingSmall} td`]: {
      padding: "12px 8px",
    },
    [`&.${classes.cellSpacingMedium} td`]: {
      padding: "15px 10px",
    },
    [`&.${classes.cellSpacingLarge} td`]: {
      padding: "18px 12px",
    },
    [`&.${classes.leftSpacingSmall} td:first-child`]: {
      paddingLeft: 5,
    },
    [`&.${classes.leftSpacingMedium} td:first-child`]: {
      paddingLeft: 15,
    },
    [`&.${classes.leftSpacingLarge} td:first-child`]: {
      paddingLeft: 30,
    },
    "& tr:hover td": {
      backgroundColor: "#ecf1f0",
      transition: "0.4s",
    },
    "& tr:hover .table-row-actions": {
      opacity: 1,
      transition: "0.4s",
    },
  },
  stickyHeader: {
    "& th": {
      position: "sticky",
      top: 80,
      backgroundColor: "#fff",
      zIndex: 10,
    },
    " & th:after": {
      content: "''",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      borderBottom: "2px solid #DAE5E3",
    },
  },
  stickyHeader80: {
    "& th": {
      top: 80,
    },
  },
  stickyHeader40: {
    "& th": {
      top: -40,
    },
  },
  noStickyHeader: {
    "& th": {
      borderBottom: "2px solid #DAE5E3",
    },
  },
  sortable: {
    cursor: "pointer",
    userSelect: "none",
  },
  sortableActive: {
    color: theme.palette.primary.main + " !important",
    "& .sort-icon": {
      opacity: 1,
    },
  },
  clickable: {
    cursor: "pointer",
  },
  colorDefault: {
    "& thead tr": {
      color: "#83838A !important",
    },
    "& thead th": {
      color: "#83838A !important",
    },
  },
  colorGrey: {
    "& thead tr": {
      backgroundColor: "#ebedec",
    },
    "& thead th": {
      color: "#657f7a !important",
    },
  },
  loadMoreButton: {
    marginTop: 33,
    marginBottom: 33,
  },
  loadAllButton: {
    marginTop: 33,
    marginBottom: 33,
    marginLeft: 33,
  },
  noResults: {
    textAlign: "center",
    lineHeight: "100px",
    cursor: "default",
  },
  loadButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nowrap: {
    whiteSpace: "nowrap",
  },
  selected: {
    "& td": {
      color: "#fff",
      backgroundColor: "#7fd3c2 !important",
      transition: "0.4s",
    },
    "&:hover td": {
      backgroundColor: theme.palette.primary.main + " !important",
    },
  },
}));

export default useStyles;
