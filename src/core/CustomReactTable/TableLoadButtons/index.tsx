import React, { FC } from "react";
import "@tanstack/react-table";
import { LoadMoreIcon } from "icons";
import { CustomButton } from "core";
import useStyles from "./styles";

type TableLoadButtonsProps = {
  isLoadingDataList?: boolean;
  onClickLoadMore?: (e: React.MouseEvent<HTMLElement>) => void;
  onClickLoadAll?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const TableLoadButtons: FC<TableLoadButtonsProps> = ({
  isLoadingDataList,
  onClickLoadMore,
  onClickLoadAll,
}) => {
  const { classes } = useStyles();

  return (
    <tfoot>
      <tr>
        <td colSpan={99}>
          <div className={classes.loadButtons}>
            <CustomButton
              text="Mehr laden"
              size="small"
              color="blue"
              align="center"
              iconBefore={<LoadMoreIcon />}
              rootClassName={classes.loadMoreButton}
              onClick={onClickLoadMore}
              loading={isLoadingDataList}
            />
            {onClickLoadAll && (
              <CustomButton
                text="Alle laden"
                size="small"
                color="blue"
                align="center"
                iconBefore={<LoadMoreIcon />}
                rootClassName={classes.loadAllButton}
                onClick={onClickLoadAll}
                loading={isLoadingDataList}
              />
            )}
          </div>
        </td>
      </tr>
    </tfoot>
  );
};
