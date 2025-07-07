import React, { useImperativeHandle, useRef, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { FieldHandles } from "types";
import useStyles from "./styles";

type CustomCheckboxProps = {
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  name?: string;
  indeterminate?: boolean;
  label?: React.ReactNode;
  disabled?: boolean;
};

const CustomCheckboxComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomCheckboxProps
> = (
  { onChange, checked, name, indeterminate = false, label, disabled = false },
  customCheckboxRef,
) => {
  const { classes, cx } = useStyles();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputID = nanoid();
  const inputRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(customCheckboxRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(inputID, {
          smooth: true,
          offset: -150,
          duration: 700,
        });
      }
      inputRef.current?.focus();
    },
  }));

  return label ? (
    <FormControlLabel
      control={
        <Checkbox
          color="default"
          onChange={(e, value) => {
            setInputStatus("default");
            onChange(e, value);
          }}
          checked={checked}
          name={name}
          classes={{
            root: cx(
              classes.root,
              inputStatus === "error" ? classes.inputError : null,
              inputStatus === "success" ? classes.inputSuccess : null,
            ),
            checked: classes.checked,
          }}
          indeterminate={indeterminate}
          ref={inputRef}
          disabled={disabled}
        />
      }
      label={label}
      id={inputID}
      classes={{ label: classes.label }}
    />
  ) : (
    <Checkbox
      color="default"
      onChange={(e, value) => {
        setInputStatus("default");
        onChange(e, value);
      }}
      checked={checked}
      name={name}
      classes={{
        root: cx(
          classes.root,
          inputStatus === "error" ? classes.inputError : null,
          inputStatus === "success" ? classes.inputSuccess : null,
        ),
        checked: classes.checked,
      }}
      indeterminate={indeterminate}
      ref={inputRef}
      disabled={disabled}
    />
  );
};

export default React.forwardRef(CustomCheckboxComponent);
