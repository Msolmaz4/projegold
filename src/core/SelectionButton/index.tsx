import React from "react";
import { Button, Typography } from "@mui/material";
import { PenEditIcon } from "icons";
import { nanoid } from "nanoid";
import { CustomFormLabelProps } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

interface SelectionButtonProps extends CustomFormLabelProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectionButton: React.FC<SelectionButtonProps> = ({
  onClick,
  name,
  required = false,
  disabled = false,

  // CustomFormLabelProps
  info,
  infoContent,
  infoTitle,
  label,
  description,
  id = nanoid(5),
  showRequiredSymbol,
  nodeBefore,
  nodeAfter,
}) => {
  const { classes, cx } = useStyles();

  return (
    <>
      <CustomFormLabel
        info={info}
        infoContent={infoContent}
        infoTitle={infoTitle}
        label={label}
        description={description}
        id={id}
        showRequiredSymbol={required && showRequiredSymbol}
        nodeBefore={nodeBefore}
        nodeAfter={nodeAfter}
      />

      <Button
        className={classes.button}
        onClick={onClick}
        focusVisibleClassName={classes.focusVisible}
        disabled={disabled}
        id={id}
      >
        <Typography
          className={cx(
            classes.buttonText,
            disabled ? classes.buttonTextDisabled : "",
          )}
        >
          {name}
        </Typography>
        <PenEditIcon
          className={cx(
            classes.editIcon,
            disabled ? classes.editIconDisabled : "",
          )}
        />
      </Button>
    </>
  );
};

export default SelectionButton;
