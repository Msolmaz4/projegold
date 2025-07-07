import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Select, { ActionMeta, StylesConfig } from "react-select";

type SelectOption = {
  label: string;
  value: string;
};

type CustomOutlineSelectProps = {
  id: string;
  value: SelectOption | null;
  options: SelectOption[];
  onChange: (
    value: SelectOption | null,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  className: string;
  selectSize: "small" | "medium" | "big";
  isDisabled: boolean;
};

const CustomOutlineSelect: React.FC<CustomOutlineSelectProps> = ({
  id,
  value,
  options,
  onChange,
  className,
  selectSize = "medium",
  isDisabled,
}) => {
  const theme = useTheme();

  const mediaQuerySMUp = useMediaQuery(
    theme.breakpoints.up(theme.breakpoints.values.sm),
  );

  type IsMulti = false;

  const selectStyle: StylesConfig<SelectOption, IsMulti> = {
    control: (base) => ({
      ...base,
      // This line disable the blue border
      boxShadow: "none",
      border: isDisabled ? "1px solid #F7CB47" : "1px solid #21bddf",
      cursor: "pointer",
      backgroundColor: "transparent",
      width: "inherit",
      "&:hover": {
        border: isDisabled ? "1px solid #deb438" : "1px solid #0d9cbf",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 0,
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      paddingBottom: 0,
      marginBottom: 0,
      marginTop: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#ebf9fc"
        : state.isFocused
          ? "#fafafc"
          : "none",
      color: "#333333",
      padding: 7,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: selectSize === "small" ? 5 : 14,
      paddingRight: selectSize === "small" ? 7 : 17,
      color: isDisabled ? "#fff" : "#21bddf",
      "&:hover": {
        color: "#0d9cbf",
      },
      "& svg": {
        width: "20px",
        height: "20px",
      },
    }),
    indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
    valueContainer: (provided) => ({
      ...provided,
      justifyContent: selectSize === "small" ? "left" : "center",
      padding: selectSize === "small" ? "0 0 0 10px" : "2px 8px",
      fontSize: selectSize === "small" ? 15 : 18,
    }),
    singleValue: (provided) => ({
      ...provided,
      marginLeft: selectSize === "small" ? 0 : 30,
      color: isDisabled ? "#F7CB47" : "#21bddf",
      fontWeight: 500,
    }),
  };

  return (
    <Select
      id={id}
      value={value}
      styles={selectStyle}
      options={options}
      onChange={onChange}
      className={className}
      isDisabled={isDisabled}
      isSearchable={mediaQuerySMUp}
    />
  );
};

export default CustomOutlineSelect;
