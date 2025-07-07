import React, { CSSProperties, ReactNode } from "react";
import { useAuthContext } from "hooks";
import TableLoadButtons from "../TableLoadButtons";
import useStyles from "../styles";

type TableBaseProps = {
  tableTheme?: "default" | "bordered" | "striped";
  headerColor?: "default" | "grey";
  leftSpacing?: "none" | "xsmall" | "small" | "medium" | "large";
  headerSpacing?: "xsmall" | "small" | "medium" | "large";
  cellSpacing?: "xsmall" | "small" | "medium" | "large";
  clickable?: boolean;
  uppercaseHeaders?: boolean;
  marginBottom?: CSSProperties["marginBottom"];
  sticky?: boolean;
  stickyOffset?: number;
  fixedLayout?: boolean;
  isLoadingDataList?: boolean;
  hasNextData?: boolean;
  noResultsText?: ReactNode;
  onClickLoadMore?: (e: React.MouseEvent<HTMLElement>) => void;
  onClickLoadAll?: (e: React.MouseEvent<HTMLElement>) => void;
  tableClassName?: string;
};

type CustomTableProps = TableBaseProps & {
  children: React.ReactNode;
};

const CustomTable: React.FC<CustomTableProps> = ({
  tableTheme,
  headerColor,
  leftSpacing,
  headerSpacing,
  cellSpacing,
  marginBottom = "1rem",
  clickable = false,
  uppercaseHeaders = true,
  sticky = true,
  stickyOffset = 80,
  fixedLayout = false,
  isLoadingDataList,
  hasNextData,
  onClickLoadMore,
  onClickLoadAll,
  tableClassName,
  children,
}) => {
  const { userData } = useAuthContext();

  const { classes, cx } = useStyles({
    tableTheme: tableTheme ?? userData?.userSettings.tableTheme ?? "default",
    headerColor:
      headerColor ?? userData?.userSettings.tableHeaderColor ?? "default",
    leftSpacing: leftSpacing ?? userData?.userSettings.tableSpacing ?? "large",
    headerSpacing:
      headerSpacing ?? userData?.userSettings.tableSpacing ?? "medium",
    cellSpacing: cellSpacing ?? userData?.userSettings.tableSpacing ?? "medium",
    uppercaseHeaders,
    clickable,
    marginBottom,
    sticky,
    stickyOffset,
    fixedLayout,
  });

  return (
    <>
      <table className={cx(classes.table, tableClassName)}>
        {children}

        {hasNextData && !isLoadingDataList && (
          <TableLoadButtons
            isLoadingDataList={isLoadingDataList}
            onClickLoadAll={onClickLoadAll}
            onClickLoadMore={onClickLoadMore}
          />
        )}
      </table>
    </>
  );
};

export default CustomTable;
