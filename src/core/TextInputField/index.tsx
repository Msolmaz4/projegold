import React, { useImperativeHandle, useRef, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  Slide,
} from "@mui/material";
import { CheckmarkDoneIcon, CrossIconSVG, InfoRoundIcon } from "icons";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { FieldHandles, TextInputFieldProps } from "types";
import CustomFormLabel from "../CustomFormLabel";
import Loading from "../Loading";
import useStyles from "./styles";

const TextInputFieldComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  TextInputFieldProps
> = (
  {
    className,
    value,
    onChange,
    type = "text",
    maxWidth,
    placeholder,
    disabled = false,
    multiline = false,
    rows = 5,
    marginBottom = false,
    validate,
    tabIndex = 0,
    autoFocus = false,
    required = false,
    isLoading = false,
    isClearable = false,
    unitAdornment,

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

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    onChange(e);
    if (validate) {
      const isValid = validate(e.target.value);
      if (isValid) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    } else {
      setInputStatus("default");
    }
  };

  return (
    <FormControl
      style={{ maxWidth: maxWidth ? maxWidth : "unset" }}
      classes={{
        root: cx(
          className || classes.formControlRoot,
          validate && inputStatus === "error" ? classes.inputError : null,
          validate && inputStatus === "success" ? classes.inputSuccess : null,
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
        errorLabel={validate && inputStatus === "error"}
      />

      <InputBase
        autoFocus={autoFocus}
        classes={{
          root: classes.root,
          input: cx(
            classes.input,
            marginBottom ? classes.inputMarginBottom : null,
          ),
          focused: classes.focusedInput,
        }}
        type={type}
        value={value}
        onChange={onChangeHandler}
        onBlur={onChangeHandler}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        name={id}
        id={id}
        inputRef={inputRef}
        // tabIndex={tabIndex}
        placeholder={placeholder}
        inputProps={{ tabIndex: tabIndex }}
        endAdornment={
          <InputAdornment
            position="start"
            style={{ marginRight: isLoading ? 8 : 0 }}
          >
            {isLoading ? <Loading size="20px" style={{ margin: 0 }} /> : null}

            {validate && inputStatus === "success" ? (
              <Slide
                direction="right"
                in={inputStatus === "success"}
                mountOnEnter
                unmountOnExit
                timeout={700}
              >
                <span style={{ lineHeight: 0, marginRight: 8 }}>
                  <CheckmarkDoneIcon className={classes.successIcon} />
                </span>
              </Slide>
            ) : null}
            {validate && inputStatus === "error" ? (
              <Slide
                direction="right"
                in={inputStatus === "error"}
                mountOnEnter
                unmountOnExit
                timeout={700}
              >
                <span style={{ lineHeight: 0, marginRight: 8 }}>
                  <InfoRoundIcon className={classes.errorIcon} />
                </span>
              </Slide>
            ) : null}
            {unitAdornment && (
              <span className={classes.unitAdornment}>{unitAdornment}</span>
            )}
            {isClearable && (
              <IconButton
                className={classes.clearButton}
                onClick={() => {
                  onChange({ target: { value: "" } } as any);
                  inputRef.current?.focus();
                }}
              >
                <CrossIconSVG className={classes.clearIcon} />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default React.forwardRef(TextInputFieldComponent);
