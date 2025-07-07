import React, { useImperativeHandle, useRef, useState } from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { AutoCompleteOptionProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

declare module "react" {
  function forwardRef<T, P = unknown>(
    render: (props: P, ref: ForwardedRef<T>) => ReactElement | null,
  ): (props: P & RefAttributes<T>) => ReactElement | null;
}

interface AutoCompleteProps<DataType>
  extends AutoCompleteOptionProps<DataType> {
  onChange: (value: DataType[]) => void;
  options: DataType[];
  value: DataType[];
}

const AutoCompleteComponent: <DataType>(
  p: AutoCompleteProps<DataType>,
  ref: React.ForwardedRef<FieldHandles>,
) => React.ReactElement<AutoCompleteProps<DataType>> = (
  {
    onChange,
    getOptionLabel,
    sort = true,
    options,
    value,
    limitTags = -1,
    labelSize = "medium",
    rootClass,
    placeholder,
    required = false,
    colorMode = "dark",

    // CustomFormLabelProps
    info,
    infoContent,
    infoTitle,
    label,
    description,
    id = nanoid(),
    showRequiredSymbol,
    nodeBefore,
    nodeAfter,
  },
  customAutoCompleteRef,
) => {
  const { classes, cx } = useStyles();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputID = nanoid();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (_: any, v: any[]) => {
    onChange(v);
    if (required) {
      if (v && v.length > 0) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    }
  };

  const onBlurHandler = () => {
    if (required) {
      if (value.length > 0) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    }
  };

  useImperativeHandle(customAutoCompleteRef, () => ({
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
        errorLabel={inputStatus === "error"}
      />

      <Autocomplete
        multiple
        onChange={onChangeHandler}
        id={id}
        options={
          sort && getOptionLabel
            ? options.sort((a, b) =>
                getOptionLabel(a).localeCompare(getOptionLabel(b)),
              )
            : options
        }
        value={value}
        getOptionLabel={getOptionLabel}
        limitTags={limitTags}
        classes={{
          tag: colorMode === "light" ? classes.tagLight : classes.tagDark,
        }}
        size={labelSize}
        disableClearable={true}
        openOnFocus={true}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            classes={{
              root: cx(
                classes.root,
                colorMode === "light" ? classes.rootLight : classes.rootDark,
                rootClass,
                inputStatus === "error" ? classes.inputError : null,
                inputStatus === "success" ? classes.inputSuccess : null,
              ),
            }}
            onBlur={onBlurHandler}
            name={inputID}
            inputRef={inputRef}
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default React.forwardRef(AutoCompleteComponent);
