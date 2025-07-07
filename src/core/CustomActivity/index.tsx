import React from "react";
import { LoadMoreIcon } from "icons";
import { CustomButton } from "..";
import useStyles from "./styles";

type CustomActivityProps = {
  className?: string;
  isLoadingDataList?: boolean;
  hasNextData?: boolean;
  onClickLoadMore?: (e: React.MouseEvent<HTMLElement>) => void;
  onClickLoadAll?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
};

const CustomActivity: React.FC<CustomActivityProps> = ({
  className,
  isLoadingDataList,
  hasNextData,
  onClickLoadMore,
  onClickLoadAll,
  children,
}) => {
  const { classes, cx } = useStyles();

  return (
    <>
      <div className={cx(classes.activity, className)}>{children}</div>
      {hasNextData && (
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
      )}
    </>
  );
};

export default CustomActivity;
