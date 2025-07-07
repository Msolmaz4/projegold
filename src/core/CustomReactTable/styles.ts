import { CSSProperties } from "react";
import { makeStyles } from "tss-react/mui";

type CustomTableStyleProps = {
  tableTheme: "default" | "bordered" | "striped";
  headerColor: "default" | "grey";
  leftSpacing: "none" | "xsmall" | "small" | "medium" | "large";
  headerSpacing: "xsmall" | "small" | "medium" | "large";
  cellSpacing: "xsmall" | "small" | "medium" | "large";
  clickable: boolean;
  uppercaseHeaders: boolean;
  marginBottom: CSSProperties["marginBottom"];
  sticky: boolean;
  stickyOffset: number;
  fixedLayout: boolean;
};

const useStyles = makeStyles<CustomTableStyleProps>()(
  (
    theme,
    {
      tableTheme,
      headerColor,
      leftSpacing,
      headerSpacing,
      cellSpacing,
      clickable,
      uppercaseHeaders,
      marginBottom,
      sticky,
      stickyOffset,
      fixedLayout,
    },
  ) => ({
    table: {
      width: "100%",
      color: "#3F4254",
      backgroundColor: "transparent",
      borderCollapse: "separate",
      borderSpacing: 0,
      marginBottom,
      tableLayout: fixedLayout ? "fixed" : "auto",
      fontSize: cellSpacing === "xsmall" ? 14 : undefined,

      "& thead tr": {
        backgroundColor: headerColor === "grey" ? "#ebedec" : "unset",
      },

      "& thead th": {
        fontWeight: 600,
        color:
          headerColor === "default"
            ? "#83838A !important"
            : "#657f7a !important",
        fontSize: 12,
        textTransform: uppercaseHeaders ? "uppercase" : "none",
        letterSpacing: "1px",
        verticalAlign: "middle",
        paddingTop: 12,
        paddingBottom: 12,
        outline: "none",
        textAlign: "inherit",
        lineHeight: "28px",
        whiteSpace: "nowrap",
        padding:
          headerSpacing === "xsmall"
            ? 5
            : headerSpacing === "small"
              ? 5
              : headerSpacing === "medium"
                ? 10
                : 15,

        borderTop: tableTheme === "bordered" ? "2px solid #DAE5E3" : 0,
        borderLeft: tableTheme === "bordered" ? "2px solid #DAE5E3" : undefined,
        borderBottom:
          tableTheme === "bordered" ? undefined : "2px solid #DAE5E3",

        "&:last-child": {
          borderRight:
            tableTheme === "bordered" ? "2px solid #DAE5E3" : undefined,
        },

        "&:first-child": {
          paddingLeft:
            leftSpacing === "none"
              ? "unset"
              : leftSpacing === "xsmall"
                ? 15
                : leftSpacing === "small"
                  ? 30
                  : leftSpacing === "medium"
                    ? 45
                    : 45,
        },
        "&:hover .sort-icon": {
          opacity: 1,
        },
        "&.sortable": {
          cursor: "pointer",
        },
        "&.sortable-active": {
          color: theme.palette.primary.main + " !important",
        },
        "&.sortable-active .sort-icon": {
          opacity: 1,
        },
      },
      "& thead": {
        // sticky header
        ...(sticky
          ? {
              position: "sticky",
              top: stickyOffset,
              backgroundColor: "#fff",
              zIndex: 10,
            }
          : {}),

        "& tr:last-child th": {
          borderBottom:
            tableTheme === "bordered" ? "2px solid #DAE5E3" : undefined,
        },
      },
      "& tbody tr": {
        cursor: clickable ? "pointer" : "unset",
        ":last-child td": {
          borderBottom:
            tableTheme === "bordered" ? "1px solid #DAE5E3" : undefined,
        },
      },
      "& tbody tr:first-child td": {
        borderTop: tableTheme === "bordered" ? "1px solid transparent" : "none",
      },
      "& tbody tr:nth-child(2n)": {
        backgroundColor: "#fafcfc",
      },
      "& td": {
        verticalAlign: "middle",
        borderTop:
          tableTheme === "bordered" ? "1px solid #DAE5E3" : "1px solid #eaeaea",
        borderLeft: tableTheme === "bordered" ? "1px solid #DAE5E3" : undefined,
        "&:last-child": {
          borderRight:
            tableTheme === "bordered" ? "1px solid #DAE5E3" : undefined,
        },
        borderBottom:
          tableTheme === "bordered" ? "1px solid transparent" : undefined,
        padding:
          cellSpacing === "xsmall"
            ? "1px 4px"
            : cellSpacing === "small"
              ? "12px 8px"
              : cellSpacing === "medium"
                ? "15px 10px"
                : "18px 12px",
      },
      "& td:first-child": {
        paddingLeft:
          leftSpacing === "none"
            ? "unset"
            : leftSpacing === "xsmall"
              ? 15
              : leftSpacing === "small"
                ? 30
                : leftSpacing === "medium"
                  ? 45
                  : 45,
      },
      "& .rowspan td:first-child": {
        paddingLeft:
          leftSpacing === "none"
            ? "unset"
            : leftSpacing === "small"
              ? 8
              : leftSpacing === "medium"
                ? 10
                : 12,
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

    noResults: {
      textAlign: "center",
      lineHeight: "100px",
      cursor: "default",
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
    center: {
      textAlign: "center",
    },
    right: {
      textAlign: "right",
    },
    left: {
      textAlign: "left",
    },
  }),
);

export default useStyles;
