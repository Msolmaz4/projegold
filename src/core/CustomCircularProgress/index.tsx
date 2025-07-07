import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useStyles from "./styles";

type CustomCircularProgressProps = {
  progressValue: number;
  itemsCurrent: number;
  itemsTotal: number;
};

const CustomCircularProgress: React.FC<CustomCircularProgressProps> = ({
  progressValue,
  itemsCurrent,
  itemsTotal,
}) => {
  const { classes } = useStyles();
  return (
    <div className={classes.progressContainer}>
      <div className={classes.itemsCount}>
        {itemsCurrent}/{itemsTotal}
      </div>
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={progressValue} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${Math.round(progressValue)}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CustomCircularProgress;
