import React from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";

type NumberFieldProps = {
  //   onChange: React.FormEventHandler<HTMLInputElement>;
  onValueChange?: (values: NumberFormatValues) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  thousandSeparator?: boolean | string;
};

const NumberField: React.FC<NumberFieldProps> = ({
  inputRef,
  onValueChange,
  decimalScale,
  fixedDecimalScale = false,
  thousandSeparator = ".",
  ...rest
}) => {
  return (
    <NumericFormat
      {...rest}
      onValueChange={onValueChange}
      thousandSeparator={thousandSeparator}
      decimalSeparator=","
      getInputRef={inputRef}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
    />
  );
};

export default NumberField;
