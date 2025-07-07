import React from "react";
import { Rating } from "@mui/material";
import useStyles from "./styles";

type CustomRatingProps = {
  reviewsCount: number;
  reviewAverage: number;
  classNameRoot: string;
  link: string;
};

const CustomRating: React.FC<CustomRatingProps> = ({
  reviewsCount,
  reviewAverage,
  classNameRoot,
  link,
}) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.review, classNameRoot)}>
      <span className={classes.reviewAverage}>{reviewAverage}</span>
      <Rating name="read-only" value={reviewAverage} readOnly />
      <a href={link} className={classes.reviewCount}>
        {reviewsCount}
      </a>
    </div>
  );
};

export default CustomRating;
