import React, { useImperativeHandle, useRef, useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
} from "@mui/material";
import { EyeLineIcon, EyeLineOffIcon } from "icons";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

interface PasswordFieldProps extends CustomFormLabelProps {
  className?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  disabled?: boolean;
  showOnStart?: boolean;
}

const PasswordFieldComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  PasswordFieldProps
> = (
  {
    className,
    value,
    onChange,
    disabled = false,
    showOnStart = false,

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

  const [showPassword, setShowPassword] = useState(showOnStart);

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
    setInputStatus("default");
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
    >
      <CustomFormLabel
        info={info}
        infoContent={infoContent}
        infoTitle={infoTitle}
        label={label}
        description={description}
        id={id}
        showRequiredSymbol={showRequiredSymbol}
        nodeBefore={nodeBefore}
        nodeAfter={nodeAfter}
        errorLabel={inputStatus === "error"}
      />

      <InputBase
        classes={{
          root: classes.root,
          input: cx(classes.input),
          focused: classes.focusedInput,
        }}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChangeHandler}
        onBlur={onChangeHandler}
        disabled={disabled}
        name={id}
        id={id}
        inputRef={inputRef}
        endAdornment={
          <InputAdornment position="start" style={{ marginRight: 0 }}>
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeLineOffIcon className={classes.eyeIcon} />
              ) : (
                <EyeLineIcon className={classes.eyeIcon} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default React.forwardRef(PasswordFieldComponent);
