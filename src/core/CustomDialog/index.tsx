import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  // Paper,
  // PaperProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CloseIcon } from "icons";
// import Draggable from "react-draggable";
import { ButtonColor } from "types";
import { CustomButton } from "core";
import useStyles from "./styles";

type CustomDialogProps = {
  dialogOpen: boolean;
  showConfirm: boolean;
  confirmButtonLoading?: boolean;
  confirmButtonColor?: ButtonColor;
  confirmButtonLoadingTime?: number;
  confirmDisabled?: boolean;
  confirmText?: string;
  confirmAction?: (e: React.MouseEvent<HTMLElement>) => void;
  showSecondary?: boolean;
  secondaryButtonLoading?: boolean;
  secondaryButtonColor?: ButtonColor;
  secondaryButtonLoadingTime?: number;
  secondaryDisabled?: boolean;
  secondaryText?: string;
  secondaryAction?: (e: React.MouseEvent<HTMLElement>) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleText?: React.ReactNode;
  positive?: boolean;
  showDecline: boolean;
  declineText?: string;
  declineAction?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  minWidth?: number;
  fullWidth?: boolean;
  fullScreen?: boolean;
  dialogDisabled?: boolean;
  dialogDisabledContent?: React.ReactNode;
  contentPadding?: number | string;
  dialogContentStyle?: React.CSSProperties | undefined;
};

// function PaperComponent(props: PaperProps) {
//   return (
//     <Draggable
//       handle="#responsive-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// }

const CustomDialog: React.FC<CustomDialogProps> = ({
  dialogOpen,
  showConfirm = true,
  confirmButtonLoading = false,
  confirmButtonColor,
  confirmButtonLoadingTime,
  confirmDisabled = false,
  confirmText,
  confirmAction,
  showSecondary = false,
  secondaryButtonLoading = false,
  secondaryButtonColor,
  secondaryButtonLoadingTime,
  secondaryDisabled = false,
  secondaryText,
  secondaryAction,
  setDialogOpen,
  titleText,
  positive = true,
  showDecline = true,
  declineText = "Abbrechen",
  declineAction,
  children,
  maxWidth = false,
  minWidth,
  fullWidth = false,
  fullScreen = false,
  dialogDisabled = false,
  dialogDisabledContent,
  contentPadding = 40,
  dialogContentStyle,
}) => {
  const theme = useTheme();
  const fullScreenMd = useMediaQuery(theme.breakpoints.down("md"));

  // const isDesktop = useMediaQuery("@media (pointer: fine)");

  const { classes, cx } = useStyles();

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen || fullScreenMd}
      open={dialogOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      // PaperComponent={isDesktop ? PaperComponent : undefined}
      classes={{ paperScrollPaper: classes.scrollRoot }}
    >
      <DialogTitle
        className={classes.titleRoot}
        style={{ cursor: "move" }}
        id="responsive-dialog-title"
      >
        <Typography variant="h6" className={classes.title} id="test">
          {titleText}
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className={cx(
          classes.scrollRoot,
          dialogDisabled ? classes.dialogDisabledWrapper : undefined,
        )}
        style={{
          minWidth: minWidth ?? "unset",
          padding: contentPadding,
          ...dialogContentStyle,
        }}
      >
        {dialogDisabled && (
          <div className={classes.dialogDisabledContent}>
            {dialogDisabledContent}
          </div>
        )}
        <div className={dialogDisabled ? classes.dialogDisabled : undefined}>
          {children}
        </div>
      </DialogContent>
      {(showConfirm || showDecline) && (
        <DialogActions className={classes.actionsRoot}>
          {showDecline && (
            <CustomButton
              text={declineText}
              onClick={declineAction || handleClose}
              color={positive ? "red" : "default"}
            />
          )}
          {(showConfirm || showSecondary) && (
            <div>
              {showSecondary && (
                <CustomButton
                  loading={secondaryButtonLoading}
                  disabled={secondaryDisabled}
                  text={secondaryText}
                  onClick={secondaryAction}
                  // size="small"
                  color={secondaryButtonColor ? secondaryButtonColor : "blue"}
                  style="outlined"
                  loadingTime={secondaryButtonLoadingTime}
                  marginRight={33}
                />
              )}
              {showConfirm && (
                <CustomButton
                  loading={confirmButtonLoading}
                  disabled={confirmDisabled}
                  text={confirmText}
                  onClick={confirmAction}
                  // size="small"
                  color={
                    confirmButtonColor
                      ? confirmButtonColor
                      : positive
                        ? "default"
                        : "red"
                  }
                  style="filled"
                  loadingTime={confirmButtonLoadingTime}
                />
              )}
            </div>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomDialog;
