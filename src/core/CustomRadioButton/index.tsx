import React, { useImperativeHandle, useRef, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomRadioButtonProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

const CustomRadioButtonComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomRadioButtonProps
> = (
  {
    className,
    value,
    options,
    onChange,
    disabled = false,
    autoFocus = false,
    required = false,
    row = false,
    radioSize = 28,
    spaceBetween = 10,

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
  },
  textInputFieldRef,
) => {
  const { classes, cx } = useStyles();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(textInputFieldRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -150,
          duration: 700,
        });
      }
      inputRef.current?.focus();
    },
  }));

  return (
    <FormControl
      classes={{
        root: cx(
          className || classes.formControlRoot,
          inputStatus === "error" ? classes.inputError : null,
          inputStatus === "success" ? classes.inputSuccess : null,
        ),
      }}
    >
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
        errorLabel={inputStatus === "error"}
      />
      <RadioGroup
        aria-labelledby={id}
        value={value ? value.value : null}
        onChange={(e) => {
          const selectedOption = options.find(
            (option) => option.value === e.target.value,
          );
          onChange(selectedOption ?? options[0]);
          setInputStatus("default");
        }}
        ref={inputRef}
        row={row}
        autoFocus={autoFocus}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                inputRef={index === 0 ? inputRef : undefined}
                sx={{
                  color: inputStatus === "error" ? "#f44336" : undefined,
                  "& .MuiSvgIcon-root": {
                    width: radioSize,
                    height: radioSize,
                  },
                }}
              />
            }
            label={option.label}
            disabled={disabled}
            sx={{
              "&:not(:last-child)": {
                marginRight: spaceBetween,
              },
              "&:last-child": {
                marginRight: 0,
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default React.forwardRef(CustomRadioButtonComponent);
