import React from "react";
import { Slider } from "@mui/material";
import { nanoid } from "nanoid";
import { CustomFormLabelProps } from "types";
import CustomFormLabel from "../CustomFormLabel";

interface CustomSliderProps extends CustomFormLabelProps {
  classNameRoot?: string;
  required?: boolean;
  value?: number | number[] | undefined;
  onChange?:
    | ((event: Event, value: number | number[], activeThumb: number) => void)
    | undefined;
  defaultValue?: number | number[] | undefined;
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode)
    | undefined;
  getAriaValueText?: ((value: number, index: number) => string) | undefined;
  step?: number | null | undefined;
  valueLabelDisplay?: "on" | "off" | "auto" | undefined;
  marks?: boolean | any[] | undefined;
  min?: number | undefined;
  max?: number | undefined;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  classNameRoot,
  required,
  value,
  onChange,
  defaultValue,
  valueLabelFormat,
  getAriaValueText,
  step,
  valueLabelDisplay,
  marks,
  min,
  max,

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
}) => {
  return (
    <div className={classNameRoot}>
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
      />

      <Slider
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={getAriaValueText}
        step={step}
        valueLabelDisplay={valueLabelDisplay}
        marks={marks}
        min={min}
        max={max}
      />
    </div>
  );
};

export default CustomSlider;
