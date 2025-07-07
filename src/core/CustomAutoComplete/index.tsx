import React, { useImperativeHandle, useRef, useState } from "react";
import { FormControl, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles, SelectOption } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

interface CustomAutoCompleteProps extends CustomFormLabelProps {
  onChangeHandler: (value: SelectOption[]) => void;
  sort?: boolean;
  options: SelectOption[];
  value: SelectOption[];
  limitTags?: number;
  labelSize?: "small" | "medium";
  rootClass?: string;
  placeholder?: string;
  required?: boolean;
  colorMode?: "dark" | "light";
}

const CustomAutoCompleteComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomAutoCompleteProps
> = (
  {
    onChangeHandler,
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
    id = nanoid(5),
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

  const onChange = (_: any, v: SelectOption[]) => {
    onChangeHandler(v);
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
    <FormControl>
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
        onChange={(e, value) => onChange(e, value as SelectOption[])}
        id={id}
        options={
          sort
            ? options.sort((a, b) => {
                if (a.label < b.label) {
                  return -1;
                }
                if (a.label > b.label) {
                  return 1;
                }
                return 0;
              })
            : options
        }
        value={value}
        getOptionLabel={(option) => option.label}
        limitTags={limitTags}
        classes={{
          tag: colorMode === "light" ? classes.tagLight : classes.tagDark,
        }}
        size={labelSize}
        disableClearable={true}
        openOnFocus={true}
        renderInput={(params: any) => (
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
    </FormControl>
  );
};

export default React.forwardRef(CustomAutoCompleteComponent);
