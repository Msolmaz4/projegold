import React, { useImperativeHandle, useRef } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

interface CustomSwitchProps extends CustomFormLabelProps {
  checkedValue: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  name: string;
  label?: string;
  switchLabel: string;
  classNameRoot?: string;
  classNameLabel?: string;
  marginTop?: boolean;
  inputStatus?: "error" | "default";
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  showRequiredSymbol?: boolean;
  style?: React.CSSProperties;
}

const CustomSwitchComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomSwitchProps
> = (
  {
    checkedValue,
    onChange,
    name,
    switchLabel,
    classNameRoot,
    classNameLabel,
    marginTop = false,
    inputStatus = "default",
    disabled = false,
    autoFocus = false,
    required = false,
    style,

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
  customSwitchRef,
) => {
  const { classes, cx } = useStyles();

  const inputRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(customSwitchRef, () => ({
    highlight: (scroll = true) => {
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -150,
          duration: 700,
        });
      }
      console.log("inputRef.current: ", inputRef.current);
      inputRef.current?.focus();
    },
  }));

  return (
    <div
      className={cx(classNameRoot, marginTop ? classes.labelMargin : null)}
      style={style}
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

      <FormControlLabel
        classes={{
          label: cx(classNameLabel, classes.switchLabel),
          root: cx(
            classes.switchRoot,
            classNameRoot,
            inputStatus === "error" ? classes.inputErrorSwitchLabel : null,
          ),
        }}
        control={
          <Switch
            focusVisibleClassName={classes.focusVisible}
            classes={{
              switchBase: classes.switchBase,
              checked: classes.checked,
              track: classes.track,
              thumb: classes.thumb,
              input: classes.input,
              disabled: classes.disabled,
            }}
            checked={checkedValue}
            onChange={onChange}
            name={name}
            inputProps={{
              autoFocus: autoFocus,
              name: id,
              id: id,
            }}
            inputRef={inputRef}
            disabled={disabled}
          />
        }
        label={switchLabel}
      />
    </div>
  );
};

export default React.forwardRef(CustomSwitchComponent);
