import React, {
  CSSProperties,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import {
  ColumnDef,
  Row,
  RowData,
  SortingState,
  TableMeta,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAuthContext } from "hooks";
import { CustomReactTableHandles } from "types";
import { Loading, SortableHeader } from "core";
import { SelectCheckbox } from "components";
import { TableLoadButtons } from "./TableLoadButtons";
import utils from "utils";
import useStyles from "./styles";

declare module "react" {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    getRowClasses?: (row: Row<TData>) => string[];
    isRowSelected?: (row: Row<TData>) => boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    isNowrap?: boolean;
    getRawValue?: (row: Row<TData>) => string | number;
    getCellClasses?: (row: Row<TData>) => string[];
    isDefaultSort?: boolean;
    defaultSortOrder?: "asc" | "desc";
    align?: "left" | "center" | "right";
  }
}

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

type CustomReactTableProps<DataType> = TableBaseProps & {
  data: DataType[];
  columns: ColumnDef<DataType>[];
  apiSorting?: boolean;
  selectable?: boolean;
  rowClickHandler?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: DataType,
  ) => void;
  meta?: TableMeta<any> | undefined;
};

const CustomReactTableComponent: <DataType>(
  p: CustomReactTableProps<DataType>,
  ref: React.ForwardedRef<CustomReactTableHandles<DataType>>,
) => React.ReactElement<CustomReactTableProps<DataType>> = (
  {
    data,
    columns,
    apiSorting = true,
    selectable = false,
    rowClickHandler,
    isLoadingDataList,
    hasNextData,
    onClickLoadMore,
    onClickLoadAll,
    tableClassName,
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
    noResultsText = "Keine Ergebnisse gefunden",
    meta,
  },
  customReactTableRef,
) => {
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
    clickable: clickable || Boolean(rowClickHandler),
    marginBottom,
    sticky,
    stickyOffset,
    fixedLayout,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const selectColumn: ColumnDef<any> = {
    id: "select",
    header: ({ table }) => (
      <SelectCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <SelectCheckbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  };

  const table = useReactTable({
    data: data,
    columns: selectable ? [selectColumn, ...columns] : columns,
    state: {
      sorting: apiSorting ? undefined : sorting,
      columnVisibility,
    },
    onSortingChange: apiSorting ? undefined : setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: false,
    meta: meta,
  });

  const exportHandler = () => {
    utils.excel.tableListAsExcel(table, "Artikelliste.xlsx");
  };

  useImperativeHandle(customReactTableRef, () => ({
    exportToExcel: () => exportHandler(),
    getSelectedRows: () =>
      table.getSelectedRowModel().rows.map((r) => r.original),
  }));

  return (
    <>
      {/* <ViewMenu table={table} /> */}
      <table
        className={cx(classes.table, tableClassName)}
        style={{
          marginBottom: marginBottom,
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <SortableHeader
                  key={header.id}
                  headerID={header.id}
                  header={flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  headerColSpan={header.colSpan}
                  isPlaceholder={header.isPlaceholder}
                  isSortable={header.column.getCanSort()}
                  isDefaultSort={header.column.columnDef.meta?.isDefaultSort}
                  defaultSortOrder={
                    header.column.columnDef.meta?.defaultSortOrder
                  }
                  dataLength={data.length}
                  isLoadingDataList={isLoadingDataList}
                />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={99}>
                {isLoadingDataList ? (
                  <Loading
                    description="Bitte warten. Liste wird geladen... "
                    size="25px"
                  />
                ) : (
                  <div className={classes.noResults}>{noResultsText}</div>
                )}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  onClick={(e) => {
                    if (table.getIsSomeRowsSelected()) {
                      row.toggleSelected();
                    } else {
                      e.stopPropagation();
                      if (rowClickHandler) rowClickHandler(e, row.original);
                    }
                  }}
                  className={cx(
                    row.getIsSelected() ? classes.selected : "",
                    table.options.meta?.isRowSelected &&
                      table.options.meta?.isRowSelected(row)
                      ? classes.selected
                      : "",
                    ...(table.options.meta?.getRowClasses
                      ? table.options.meta.getRowClasses(row)
                      : []),
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={cx(
                          ...(cell.column.columnDef.meta?.getCellClasses
                            ? cell.column.columnDef.meta.getCellClasses(row)
                            : []),
                          cell.column.columnDef.meta?.isNowrap
                            ? classes.nowrap
                            : "",
                          cell.column.columnDef.meta?.align === "center"
                            ? classes.center
                            : cell.column.columnDef.meta?.align === "right"
                              ? classes.right
                              : cell.column.columnDef.meta?.align === "left"
                                ? classes.left
                                : "",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>

        {hasNextData && data.length > 0 && (
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

export const CustomReactTable = React.forwardRef(CustomReactTableComponent);

type CustomTableProps = TableBaseProps & {
  children: React.ReactNode;
};

export const CustomTable: React.FC<CustomTableProps> = ({
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
