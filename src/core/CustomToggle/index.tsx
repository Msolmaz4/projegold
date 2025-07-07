import React from "react";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { CustomFormLabelProps } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

interface CustomToggleProps<TypeA, TypeB> extends CustomFormLabelProps {
  toggleOptionA: TypeA;
  toggleTitleA?: string | number | TypeA;
  toggleOptionADisabled?: boolean;
  toggleOptionB: TypeB;
  toggleTitleB?: string | number | TypeB;
  toggleOptionBDisabled?: boolean;
  toggleValue: TypeA | TypeB;
  setToggleValue?: (value: React.SetStateAction<TypeA | TypeB>) => void;
  onChange?: (value: TypeA | TypeB) => void;
  label?: string;
  classNameRoot?: string;
  required?: boolean;
  showRequiredSymbol?: boolean;
}

const CustomToggle: <TypeA, TypeB>(
  p: CustomToggleProps<TypeA, TypeB>,
) => React.ReactElement<CustomToggleProps<TypeA, TypeB>> = ({
  toggleOptionA,
  toggleTitleA = toggleOptionA,
  toggleOptionADisabled = false,
  toggleOptionB,
  toggleTitleB = toggleOptionB,
  toggleOptionBDisabled = false,
  toggleValue,
  setToggleValue,
  onChange,
  classNameRoot,
  required,

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
    <div className={cx(classNameRoot)}>
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

      <ButtonGroup id={id}>
        <Button
          classes={{
            root: cx(
              classes.toggleButton,
              toggleValue === toggleOptionA ? classes.toggleButtonSelected : "",
            ),
          }}
          disabled={toggleOptionADisabled}
          onClick={() => {
            if (setToggleValue) setToggleValue(toggleOptionA);
            if (onChange) onChange(toggleOptionA);
          }}
        >
          <Typography
            className={cx(
              classes.toggleTitle,
              toggleValue === toggleOptionA ? classes.toggleTitleSelected : "",
              toggleOptionADisabled ? classes.toggleButtonDisabled : "",
            )}
          >
            {(toggleTitleA ?? toggleOptionA) as React.ReactNode}
          </Typography>
        </Button>
        <Button
          classes={{
            root: cx(
              classes.toggleButton,
              toggleValue === toggleOptionB ? classes.toggleButtonSelected : "",
            ),
          }}
          disabled={toggleOptionBDisabled}
          onClick={() => {
            if (setToggleValue) setToggleValue(toggleOptionB);
            if (onChange) onChange(toggleOptionB);
          }}
        >
          <Typography
            className={cx(
              classes.toggleTitle,
              toggleValue === toggleOptionB ? classes.toggleTitleSelected : "",
              toggleOptionBDisabled ? classes.toggleButtonDisabled : "",
            )}
          >
            {(toggleTitleB ?? toggleOptionB) as React.ReactNode}
          </Typography>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default CustomToggle;
