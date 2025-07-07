import React, { FC } from "react";
import { SortDownIcon, SortIcon, SortUpIcon } from "icons";
import useStyles from "./styles";

type SortOrderIconProps = {
  icon: React.ReactNode;
  sortIndex?: number;
};

const SortOrderIcon: React.FC<SortOrderIconProps> = ({ icon, sortIndex }) => {
  const { classes, cx } = useStyles();
  return (
    <span className={cx(classes.iconSort, "sort-icon")}>
      {icon}
      {sortIndex && <span className={classes.sortIndex}>{sortIndex}</span>}
    </span>
  );
};

type SortOrderProps = {
  isDefaultSort?: boolean;
  defaultSortOrder?: "asc" | "desc";
  currentSort: "asc" | "desc" | undefined;
  sortIndex: number | undefined;
};

export const SortOrder: FC<SortOrderProps> = ({
  isDefaultSort,
  defaultSortOrder,
  currentSort,
  sortIndex,
}) => {
  if (!currentSort && !isDefaultSort) {
    return <></>;
  }

  const derivedSortOrder =
    currentSort ??
    (isDefaultSort && defaultSortOrder ? defaultSortOrder : null);

  if (derivedSortOrder === "asc")
    return <SortOrderIcon icon={<SortUpIcon />} sortIndex={sortIndex} />;
  else if (derivedSortOrder === "desc")
    return <SortOrderIcon icon={<SortDownIcon />} sortIndex={sortIndex} />;

  return <SortOrderIcon icon={<SortIcon />} />;
};
