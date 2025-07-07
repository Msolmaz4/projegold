import React, { useImperativeHandle, useRef, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
} from "@mui/material";
import {
  CheckmarkDoneIcon,
  FontAwesomeMinusIcon,
  FontAwesomePlusIcon,
  InfoRoundIcon,
} from "icons";
import { nanoid } from "nanoid";
import { NumberFormatValues } from "react-number-format";
import { FormatInputValueFunction } from "react-number-format/types/types";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import NumberField from "../NumberField";
import useStyles from "./styles";

interface CustomNumberFieldProps extends CustomFormLabelProps {
  className?: string;
  rootStyle?: React.CSSProperties;
  number: number | "";
  setNumber?: (value: React.SetStateAction<number | "">) => void;
  onChange?: (value: number | "") => void;
  showButtons?: boolean;
  minValue?: number;
  minWidth?: number;
  maxValue?: number;
  maxWidth?: number;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  unitAdornment?: string | React.ReactNode;
  mask?: string | string[] | undefined;
  format?: string | FormatInputValueFunction | undefined;
  thousandSeparator?: boolean | string;
}

const CustomNumberFieldComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomNumberFieldProps
> = (
  {
    className,
    rootStyle,
    number,
    setNumber,
    onChange,
    showButtons = false,
    minValue = 0,
    minWidth,
    maxValue = 99999999,
    maxWidth,
    required = false,
    autoFocus = false,
    disabled = false,
    decimalScale,
    fixedDecimalScale = false,
    unitAdornment,
    mask,
    format,
    thousandSeparator = ".",

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
  customNumberFieldRef,
) => {
  const { classes, cx } = useStyles();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(customNumberFieldRef, () => ({
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

  const validate = (value: "" | number | undefined) => {
    if (required) {
      if (
        value === "" ||
        value === undefined ||
        (minValue && value < minValue) ||
        (maxValue && value > maxValue)
      ) {
        return setInputStatus("error");
      } else {
        return setInputStatus("success");
      }
    }
  };

  const onValueChange = (values: NumberFormatValues) => {
    if (setNumber) setNumber(values.floatValue ?? "");
    if (onChange) onChange(values.floatValue ?? "");
    validate(values.floatValue);
  };

  return (
    <FormControl
      classes={{
        root: cx(
          className || classes.formControlRoot,
          inputStatus === "error" ? classes.inputError : null,
          inputStatus === "success" ? classes.inputSuccess : null,
        ),
      }}
      style={rootStyle}
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

      <div className={classes.numberFieldWrapper}>
        {showButtons && (
          <IconButton
            onClick={() => {
              if (setNumber)
                setNumber(
                  number === ""
                    ? ""
                    : number === minValue
                      ? ""
                      : number > minValue
                        ? number - 1
                        : number,
                );
              if (onChange)
                onChange(
                  number === ""
                    ? ""
                    : number === minValue
                      ? ""
                      : number > minValue
                        ? number - 1
                        : number,
                );
              if (required) {
                setInputStatus("success");
              }
            }}
            disabled={
              disabled ||
              number === undefined ||
              number === "" ||
              number < minValue
            }
            className={cx(
              classes.minus,
              disabled ||
                number === undefined ||
                number === "" ||
                number < minValue
                ? classes.disabled
                : null,
            )}
            tabIndex={-1}
          >
            <FontAwesomeMinusIcon />
          </IconButton>
        )}

        <TextField
          style={{
            maxWidth: maxWidth ?? 85 + maxValue.toString().length * 9,
            minWidth: minWidth,
          }}
          onBlur={() => validate(number)}
          name={id}
          id={id}
          inputRef={inputRef}
          value={number}
          variant="standard"
          disabled={disabled}
          inputProps={{
            onValueChange: onValueChange,
            autoFocus: autoFocus,
            decimalScale: decimalScale,
            fixedDecimalScale: fixedDecimalScale,
            mask: mask,
            format: format,
            thousandSeparator: thousandSeparator,
            inputRef: inputRef,
          }}
          InputProps={{
            disableUnderline: true,
            inputComponent: NumberField as any,
            classes: {
              focused: classes.focusedInput,
              input: classes.input,
              root: cx(classes.root, disabled ? classes.disabledInput : ""),
            },
            endAdornment: (
              <InputAdornment
                position="start"
                classes={{ positionStart: classes.positionStart }}
              >
                {inputStatus === "success" ? (
                  <Slide
                    direction="right"
                    in={inputStatus === "success"}
                    mountOnEnter
                    unmountOnExit
                    timeout={700}
                  >
                    <span>
                      <CheckmarkDoneIcon className={classes.successIcon} />
                    </span>
                  </Slide>
                ) : null}
                {inputStatus === "error" ? (
                  <Slide
                    direction="right"
                    in={inputStatus === "error"}
                    mountOnEnter
                    unmountOnExit
                    timeout={700}
                  >
                    <span>
                      <InfoRoundIcon className={classes.errorIcon} />
                    </span>
                  </Slide>
                ) : null}
                {unitAdornment && (
                  <span className={classes.unitAdornment}>{unitAdornment}</span>
                )}
              </InputAdornment>
            ),
          }}
        />

        {showButtons && (
          <IconButton
            onClick={() => {
              if (setNumber)
                setNumber(
                  number === ""
                    ? (minValue ?? 0)
                    : number < maxValue
                      ? number + 1
                      : number,
                );
              if (onChange)
                onChange(
                  number === ""
                    ? (minValue ?? 0)
                    : number < maxValue
                      ? number + 1
                      : number,
                );
              if (required) {
                setInputStatus("success");
              }
            }}
            disabled={
              disabled ||
              (number !== undefined && number !== "" && number >= maxValue)
            }
            className={cx(
              classes.plus,
              disabled ||
                (number !== undefined && number !== "" && number >= maxValue)
                ? classes.disabled
                : null,
            )}
            tabIndex={-1}
          >
            <FontAwesomePlusIcon />
          </IconButton>
        )}
      </div>
    </FormControl>
  );
};

export default React.forwardRef(CustomNumberFieldComponent);
