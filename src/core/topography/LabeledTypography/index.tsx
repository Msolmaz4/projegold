import React from "react";
import { nanoid } from "nanoid";
import { CustomFormLabelProps, TypographyProps } from "types";
import CustomFormLabel from "../../CustomFormLabel";
import CustomTypography from "../CustomTypography";

interface LabeledTypographyProps extends TypographyProps, CustomFormLabelProps {
  label: React.ReactNode;
}

const LabeledTypography: React.FC<LabeledTypographyProps> = ({
  // CustomFormLabelProps
  info,
  infoContent,
  infoTitle,
  label,
  labelSize,
  description,
  id = nanoid(5),
  nodeBefore,
  nodeAfter,

  ...rest
}) => (
  <>
    <CustomFormLabel
      info={info}
      infoContent={infoContent}
      infoTitle={infoTitle}
      label={label}
      labelSize={labelSize}
      description={description}
      showRequiredSymbol={false}
      id={id}
      nodeBefore={nodeBefore}
      nodeAfter={nodeAfter}
    />

    <CustomTypography {...rest} />
  </>
);

export default LabeledTypography;
