import React, { useImperativeHandle, useRef, useState } from "react";
import { FormControl, Grid2, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { HexColorPicker } from "react-colorful";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../../CustomFormLabel";
import CustomButton from "../../buttons/CustomButton";
import ColorSwatchesDialog from "../ColorSwatchesDialog";
import useStyles from "./styles";

interface ColorPickerProps extends CustomFormLabelProps {
  info?: boolean;
  infoContent?: React.ReactNode;
  infoTitle?: string;
  label?: string;
  description?: string;
  id?: string;
  className?: string;
  color: string;
  onChange: (color: string) => void;
  maxWidth?: number;
  disabled?: boolean;
  required?: boolean;
  showRequiredSymbol?: boolean;
}

const ColorPicker: React.ForwardRefRenderFunction<
  FieldHandles,
  ColorPickerProps
> = (
  {
    className,
    color,
    onChange,
    maxWidth,
    disabled = false,
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
  textInputFieldRef,
) => {
  const { classes, cx } = useStyles();

  const [selectColorDialogOpen, setSelectColorDialogOpen] =
    useState<boolean>(false);

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef = useRef<FieldHandles>(null);

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
      inputRef.current?.highlight();
    },
  }));

  return (
    <FormControl
      style={{ maxWidth: maxWidth ? maxWidth : "unset" }}
      classes={{
        root: cx(
          className || classes.formControlRoot,
          inputStatus === "error" ? classes.inputError : null,
          inputStatus === "success" ? classes.inputSuccess : null,
        ),
      }}
    >
      <ColorSwatchesDialog
        onSelect={onChange}
        dialogOpen={selectColorDialogOpen}
        setDialogOpen={setSelectColorDialogOpen}
      />

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

      <Grid2 container direction="row" spacing={3}>
        <Grid2>
          <HexColorPicker color={color} onChange={onChange} />
        </Grid2>
        <Grid2 container direction="column" spacing={1} alignItems="center">
          <Grid2>
            <div
              className={classes.colorSwatch}
              style={{ background: color }}
              onClick={() => setSelectColorDialogOpen(true)}
            />
          </Grid2>
          <Grid2>
            <Typography variant="body2" color={color} style={{ margin: 0 }}>
              {color}
            </Typography>
          </Grid2>
          <Grid2>
            <CustomButton
              text="Farbe auswählen"
              size="xsmall"
              onClick={() => setSelectColorDialogOpen(true)}
              disabled={disabled}
              ref={inputRef}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </FormControl>
  );
};

export default React.forwardRef(ColorPicker);
