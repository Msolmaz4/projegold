import React, { useImperativeHandle, useRef, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { nanoid } from "nanoid";
import { animateScroll } from "react-scroll";
import Select, {
  GroupBase,
  PlaceholderProps,
  SelectInstance,
  SingleValueProps,
  StylesConfig,
  components,
} from "react-select";
import { CustomFormLabelProps, FieldHandles, SelectOption } from "types";
import CustomFormLabel from "../CustomFormLabel";
import utils from "utils";
import useStyles from "./styles";

interface CountryProps extends CustomFormLabelProps {
  placeholder?: string;
  className?: string;
  country: SelectOption;
  countryOnChange: (value: SelectOption) => void;
  maxWidth?: number;
  isClearable?: boolean;
  classNameRoot?: string;
  required?: boolean;
}

export const CountryComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CountryProps
> = (
  {
    placeholder = "Land",
    country,
    countryOnChange,
    maxWidth,
    isClearable = false,
    classNameRoot,
    required = false,

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
  countryRef,
) => {
  const { classes, cx } = useStyles();

  const theme = useTheme();
  const mediaQuerySMUp = useMediaQuery(
    theme.breakpoints.up(theme.breakpoints.values.sm),
  );

  const valueRef = useRef<HTMLElement>(null);
  const placeholderRef = useRef<HTMLElement>(null);

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef =
    useRef<SelectInstance<SelectOption, false, GroupBase<SelectOption>>>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(countryRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        if (selectRef.current) {
          const scrollTop = selectRef.current.offsetTop;
          animateScroll.scrollTo(scrollTop);
        }
      }
      inputRef.current?.focus();
    },
  }));

  type IsMulti = false;

  const selectStyle: StylesConfig<SelectOption, IsMulti> = {
    container: (base, state) => ({
      ...base,
      "&:hover": {
        borderColor: "#3da894 !important",
      },
      borderColor:
        inputStatus === "error"
          ? "#ddafaf"
          : inputStatus === "success"
            ? "#b2d6be"
            : "#a9bebb",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "4px",
      boxShadow:
        inputStatus === "error"
          ? "0 1px 2px 0px rgba(191, 29, 29, 0.21)"
          : inputStatus === "success"
            ? "0 1px 2px 0px rgba(21, 183, 70, 0.21)"
            : "0 1px 2px 0px rgba(0, 0, 0, 0.08)",
      overflow: state.selectProps.menuIsOpen ? "unset" : "hidden",
      marginBottom: state.selectProps.menuIsOpen ? 8.5 : 0,
      display: "inline-block",
    }),
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      backgroundColor: "#fff",
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 5,
      border: "1px solid #a9bebb",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#f0f7f5"
        : state.isFocused
          ? "#fafafc"
          : "none",
      color: "#333333",
      padding: 7,
      textAlign: "left",
      whiteSpace: "nowrap",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "",
      "& svg": {
        width: 20,
        height: 20,
      },
      padding: "8px 10px",
    }),
    indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
    // placeholder: (provided) => ({
    //   ...provided,
    // }),
    // valueContainer: (provided) => ({
    //   ...provided,
    // }),
    singleValue: (provided) => ({
      ...provided,
      position: "relative",
      marginTop: -2,
    }),
  };

  const SingleValue = (
    props: SingleValueProps<SelectOption, false, GroupBase<SelectOption>>,
  ) => (
    <components.SingleValue {...props}>
      <span className={classes.optionValue} ref={valueRef}>
        {props.children}
      </span>
    </components.SingleValue>
  );

  const Placeholder = (props: PlaceholderProps<SelectOption, IsMulti>) => (
    <components.Placeholder {...props}>
      <span className={classes.placeholder} ref={placeholderRef}>
        {props.children}
      </span>
    </components.Placeholder>
  );

  const onChangeHandler = (value: SelectOption | null) => {
    countryOnChange(value ? value : utils.phone.PHONE_PREFIXES[0]);
    if (required) {
      if (value !== null) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    }
  };

  return (
    <div
      style={{ maxWidth: maxWidth ? maxWidth : "unset" }}
      className={cx(classNameRoot)}
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

      <Select
        value={country}
        placeholder={placeholder}
        openMenuOnFocus={true}
        styles={selectStyle}
        options={utils.phone.PHONE_PREFIXES}
        onChange={onChangeHandler}
        isSearchable={!mediaQuerySMUp}
        components={{ SingleValue, Placeholder }}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.value}
        isClearable={isClearable}
        ref={inputRef}
        tabSelectsValue={false}
        id={id}
      />
    </div>
  );
};

export default React.forwardRef(CountryComponent);
