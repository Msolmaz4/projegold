import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { ButtonColor, ButtonSize, ButtonStyle, FieldHandles } from "types";
import useStyles from "../styles";

type CustomButtonProps = {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  loading?: boolean;
  loadingTime?: number;
  success?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
  hoverColor?: ButtonColor;
  style?: ButtonStyle;
  align?: CSSProperties["textAlign"];
  rootClassName?: string;
  buttonClassName?: string;
  textClassName?: string;
  paddingVertical?: string;
  paddingHorizontal?: string;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
  marginTop?: number;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  disabled?: boolean;
  responsiveOnlyIcon?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  accessKey?: string | undefined;
  styleWrapper?: CSSProperties;
};

const CustomButtonComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomButtonProps
> = (
  {
    text,
    onClick,
    loading = false,
    loadingTime = 3,
    success,
    size = "medium",
    color,
    hoverColor = color,
    style = "outlined",
    align,
    rootClassName,
    buttonClassName,
    textClassName,
    paddingVertical,
    paddingHorizontal,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    iconBefore,
    iconAfter,
    disabled = false,
    responsiveOnlyIcon = false,
    type = "button",
    accessKey,
    styleWrapper,
  },
  customButtonRef,
) => {
  const { classes, cx } = useStyles({
    color,
    size,
    style,
    hoverColor,
  });

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const [loadingTimeState, setLoadingTimeState] = useState<number>(loadingTime);

  const inputID = useMemo(() => nanoid(), []);

  useImperativeHandle(customButtonRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(inputID, {
          smooth: true,
          offset: -150,
          duration: 700,
        });
      }
    },
  }));

  useEffect(() => {
    if (!loading) {
      return;
    }

    const interval = setInterval(() => {
      setLoadingTimeState((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [loading, loadingTime]);

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick!(e);
    }
  };

  let colorClass;
  let hoverClass;

  if (loading) {
    colorClass = classes.loadingBlue;
  } else if (disabled) {
    colorClass = classes.disabledButton;
  } else {
    if (style === "filled") {
      colorClass =
        inputStatus === "error"
          ? classes.filledRed
          : inputStatus === "success"
            ? classes.filledGreen
            : color === "blue"
              ? classes.filledBlue
              : color === "red"
                ? classes.filledRed
                : color === "flatRed"
                  ? classes.filledFlatRed
                  : color === "white"
                    ? classes.filledWhite
                    : color === "yellow"
                      ? classes.filledYellow
                      : color === "grey"
                        ? classes.filledGrey
                        : color === "green"
                          ? classes.filledGreen
                          : classes.filledDefault;

      hoverClass =
        inputStatus === "error"
          ? classes.hoverRed
          : inputStatus === "success"
            ? classes.hoverGreen
            : hoverColor === "blue"
              ? classes.hoverBlue
              : hoverColor === "red"
                ? classes.hoverRed
                : hoverColor === "flatRed"
                  ? classes.hoverFlatRed
                  : hoverColor === "white"
                    ? classes.hoverWhite
                    : hoverColor === "yellow"
                      ? classes.hoverYellow
                      : hoverColor === "grey"
                        ? classes.hoverGrey
                        : hoverColor === "green"
                          ? classes.hoverGreen
                          : classes.hoverDefault;
    } else {
      colorClass =
        inputStatus === "error"
          ? classes.outlinedRed
          : inputStatus === "success"
            ? classes.outlinedGreen
            : color === "blue"
              ? classes.outlinedBlue
              : color === "red"
                ? classes.outlinedRed
                : color === "flatRed"
                  ? classes.outlinedFlatRed
                  : color === "white"
                    ? classes.outlinedWhite
                    : color === "yellow"
                      ? classes.outlinedYellow
                      : color === "grey"
                        ? classes.outlinedGrey
                        : color === "green"
                          ? classes.outlinedGreen
                          : classes.outlinedDefault;
    }
  }

  const sizeClass =
    size === "large"
      ? classes.bigSize
      : size === "medium"
        ? classes.mediumSize
        : size === "xsmall"
          ? classes.xSmallSize
          : responsiveOnlyIcon
            ? classes.smallSizeResponsiveOnly
            : classes.smallSize;

  const loadingSize =
    size === "large"
      ? 37
      : size === "medium"
        ? 33
        : size === "xsmall"
          ? 20
          : 25;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        marginLeft,
        marginRight,
        marginBottom,
        marginTop,
        textAlign: align ?? "left",
        ...styleWrapper,
      }}
      className={rootClassName}
    >
      <Button
        disabled={disabled}
        onClick={onClickHandler}
        style={{
          paddingLeft:
            paddingHorizontal !== "undefined" ? paddingHorizontal : "20px",
          paddingRight:
            paddingHorizontal !== "undefined" ? paddingHorizontal : "20px",
          paddingTop:
            paddingVertical !== "undefined" ? paddingVertical : "10px",
          paddingBottom:
            paddingVertical !== "undefined" ? paddingVertical : "10px",
        }}
        classes={{
          root: cx(
            classes.button,
            buttonClassName,
            sizeClass,
            colorClass,
            hoverClass,
            success === false && !loading ? classes.buttonFailed : "",
          ),
          focusVisible: classes.focusVisible,
        }}
        type={type}
        accessKey={accessKey}
        name={inputID}
        focusVisibleClassName={classes.focusVisible}
      >
        {iconBefore && (
          <span className={classes.iconBeforeWrapper}>{iconBefore}</span>
        )}
        {!responsiveOnlyIcon && (
          <span className={cx(classes.textContent, textClassName)}>{text}</span>
        )}
        {iconAfter && (
          <span className={classes.iconAfterWrapper}>{iconAfter}</span>
        )}
        {loading && (
          <>
            <Box
              position="absolute"
              display="flex"
              justifyContent="center"
              alignItems="center"
              top={0}
              left={0}
              bottom={0}
              right={0}
            >
              <CircularProgress
                size={loadingSize}
                className={cx(
                  classes.buttonProgress,
                  loadingTimeState > 0 ? classes.buttonProgressWithNumber : "",
                )}
              />
              {loadingTimeState > 0 && (
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
                    className={classes.loadingTime}
                  >
                    {loadingTimeState}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </Button>
    </div>
  );
};

export default React.forwardRef(CustomButtonComponent);
