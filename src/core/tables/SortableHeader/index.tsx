import { FC, ReactNode } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import SortOrder from "../SortOrder";
import useStyles from "./styles";

type SortableHeaderProps = {
  dataLength: number;
  isLoadingDataList: boolean | undefined;
  headerID: string;
  header: ReactNode;
  headerColSpan?: number;
  isPlaceholder?: boolean;
  isSortable?: boolean;
  isDefaultSort?: boolean;
  defaultSortOrder?: "asc" | "desc";
};

const SortableHeader: FC<SortableHeaderProps> = ({
  dataLength,
  isLoadingDataList,
  headerID,
  header,
  headerColSpan = 1,
  isPlaceholder = false,
  isSortable = true,
  isDefaultSort = false,
  defaultSortOrder,
}) => {
  const { classes, cx } = useStyles();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get("sort");

  const getCurrentSorting = () => {
    return sortParam
      ?.split(",")
      .find((param) => param.startsWith(headerID + ":"))
      ?.split(":")[1] as ("asc" | "desc") | undefined;
  };

  const handleLeftClick = (e: React.MouseEvent) => {
    const currentSort = getCurrentSorting();
    let updatedSortList = sortParam?.split(",") || [];

    if (currentSort) {
      // Findet den Index des aktuellen Header-Sortierfeldes in der Sortierliste
      const currentIndex = updatedSortList.findIndex((param) =>
        param.startsWith(headerID + ":"),
      );

      if (e.ctrlKey) {
        // Umschaltet die Sortierrichtung, behält aber die Position in der Liste bei
        updatedSortList[currentIndex] =
          `${headerID}:${currentSort === "asc" ? "desc" : "asc"}`;
      } else {
        // Entfernt alle anderen Sortierungen und setzt nur diese Sortierung neu
        updatedSortList = [
          `${headerID}:${currentSort === "asc" ? "desc" : "asc"}`,
        ];
      }
    } else {
      // Fügt die Sortierung hinzu, wenn noch keine vorhanden ist
      if (e.ctrlKey) {
        updatedSortList.push(`${headerID}:asc`);
      } else {
        updatedSortList = [`${headerID}:asc`];
      }
    }
    // Aktualisiert die SearchParams mit der neuen oder geänderten Sortierliste
    searchParams.set("sort", updatedSortList.join(","));
    sessionStorage.setItem(pathname, searchParams.toString());
    setSearchParams(searchParams, { replace: true });
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const otherSorts = sortParam
      ?.split(",")
      .filter((param) => !param.startsWith(headerID + ":") && param !== "")
      .join(",");

    if (otherSorts) {
      searchParams.set("sort", otherSorts);
    } else {
      searchParams.delete("sort");
    }

    sessionStorage.setItem(pathname, searchParams.toString());
    setSearchParams(searchParams, {
      replace: true,
    });
  };

  const currentSort = getCurrentSorting();
  const sortParts = sortParam?.split(",");
  const sortIndex =
    sortParts && sortParts.length > 1
      ? sortParts.indexOf(headerID + ":" + currentSort) + 1
      : undefined;

  return (
    <th key={headerID} colSpan={headerColSpan}>
      {isPlaceholder ? null : (
        <div
          {...{
            className: cx(
              isSortable ? classes.sortable : "",
              currentSort || (!sortParam && isDefaultSort)
                ? classes.sortableActive
                : "",
            ),
            onClick: isSortable ? handleLeftClick : undefined,
            onContextMenu: isSortable ? handleRightClick : undefined,
          }}
        >
          {header}
          <SortOrder
            isDefaultSort={!sortParam ? isDefaultSort : false}
            defaultSortOrder={!sortParam ? defaultSortOrder : undefined}
            currentSort={currentSort}
            sortIndex={sortIndex}
          />
          {isLoadingDataList && dataLength > 0 && currentSort && (
            <CircularProgress
              aria-describedby="loading"
              size="15px"
              style={{
                verticalAlign: "middle",
                marginTop: -1,
                marginLeft: 3,
              }}
            />
          )}
        </div>
      )}
    </th>
  );
};

export default SortableHeader;
