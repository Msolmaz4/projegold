import React, { RefObject, useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import { CheckmarkBoldIcon, PenEditIcon } from "icons";
import { FieldHandles, TextInputFieldProps, TypographyProps } from "types";
import TextInputField from "../../TextInputField";
import CustomTypography from "../CustomTypography";
import useStyles from "./styles";

type EditableTypographyProps = {
  typography: TypographyProps;
  textInputField: TextInputFieldProps;
  textInputFieldRef: RefObject<FieldHandles | null>;
  permanentVisible?: boolean;
  rootStyle?: React.CSSProperties;
  onSubmitChange?: (value: string) => void | Promise<void>;
};

const EditableTypography: React.FC<EditableTypographyProps> = ({
  typography,
  textInputField,
  textInputFieldRef,
  permanentVisible = false,
  rootStyle,
  onSubmitChange,
}) => {
  const { classes, cx } = useStyles();

  const isDesktop = useMediaQuery("@media (pointer: fine)");

  const [isEditable, setIsEditable] = useState<boolean>(false);

  return (
    <div style={rootStyle}>
      {isEditable ? (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            sx={{ height: "100%" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onSubmitChange) {
                  onSubmitChange(textInputField.value);
                }
                setIsEditable(false);
              }}
              className={classes.editForm}
            >
              <TextInputField {...textInputField} ref={textInputFieldRef} />

              <IconButton
                onClick={() => {
                  if (onSubmitChange) {
                    onSubmitChange(textInputField.value);
                  }
                  setIsEditable(false);
                }}
                className={classes.doneButton}
              >
                <CheckmarkBoldIcon className={classes.doneIcon} />
              </IconButton>
            </form>
          </Stack>
        </>
      ) : (
        <div
          className={cx(
            classes.rowActions,
            permanentVisible
              ? classes.permanentVisible
              : !isDesktop
                ? classes.permanentVisible
                : classes.visibleOnHover,
          )}
        >
          <CustomTypography {...typography} />
          <IconButton
            onClick={() => setIsEditable(true)}
            className={classes.editButton}
          >
            <PenEditIcon className={classes.editIcon} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default EditableTypography;
