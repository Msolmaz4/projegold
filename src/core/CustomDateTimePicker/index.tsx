import React, { useImperativeHandle, useMemo, useRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import { CheckmarkDoneIcon, InfoRoundIcon } from "icons";
import { CalendarIcon, CloseDuoIcon } from "icons";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import utils from "utils";
import useStyles from "./styles";

interface CustomDateTimePickerProps extends CustomFormLabelProps {
  value: Date | null;
  onChange: (date: Date | null, value?: string | null | undefined) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  resettable?: boolean;
}

const CustomDateTimePickerComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomDateTimePickerProps
> = (
  {
    value,
    onChange,
    minDate,
    maxDate,
    required = false,
    autoFocus = false,
    disabled = false,
    resettable = false,

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
  customDatePickerRef,
) => {
  const { classes, cx } = useStyles();

  const isDesktop = useMediaQuery("@media (pointer: fine)");

  const [pickerStatus, setPickerStatus] = useState<boolean>(false);
  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(customDatePickerRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -200,
          duration: 700,
        });
      }
      console.log("inputRef.current: ", inputRef.current);
      inputRef.current?.focus();
    },
  }));

  const onChangeHandler = (date: Dayjs | null) => {
    console.log("date: ", date);
    onChange(date ? date.toDate() : null);
    if (required) {
      if (date && utils.dates.isValidGermanDate(date.toDate())) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    }
  };

  const CalendarInputAdornment = useMemo(
    () => () => (
      <InputAdornment position="start">
        {inputStatus === "success" ? (
          <Slide
            direction="right"
            in={inputStatus === "success"}
            mountOnEnter
            unmountOnExit
            timeout={700}
          >
            <span style={{ lineHeight: 0 }} className={classes.statusWrapper}>
              <CheckmarkDoneIcon className={classes.successIcon} />
            </span>
          </Slide>
        ) : null}
        {inputStatus === "error" ? (
          <Slide
            direction="right"
            in={inputStatus === "error"}
            mountOnEnter
            unmountOnExit
            timeout={700}
          >
            <span style={{ lineHeight: 0 }} className={classes.statusWrapper}>
              <InfoRoundIcon className={classes.errorIcon} />
            </span>
          </Slide>
        ) : null}
        {inputStatus === "default" && resettable && (
          <IconButton
            className={classes.resetButton}
            onClick={() => {
              // if (inputRef.current) {
              //   onChangeHandler(null);
              //   inputRef.current.value = "";
              //   const input =
              //     inputRef.current.querySelector("input");
              //   if (input) {
              //     input.value = "";
              //   }
              //   inputRef.current.querySelector("input")?.focus();
              // }
            }}
            tabIndex={-1}
          >
            <CloseDuoIcon className={classes.resetIcon} />
          </IconButton>
        )}
        <IconButton
          className={cx(
            inputStatus === "default"
              ? resettable
                ? classes.datePickerButtonResettable
                : classes.datePickerButtonSingle
              : classes.datePickerButton,
          )}
          onClick={() => setPickerStatus(true)}
          disabled={disabled}
          tabIndex={-1}
        >
          <CalendarIcon className={classes.calendarIcon} />
        </IconButton>
      </InputAdornment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputStatus, resettable, disabled],
  );

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

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <DateTimePicker<Dayjs>
          open={isDesktop ? pickerStatus : undefined}
          onClose={isDesktop ? () => setPickerStatus(false) : undefined}
          openTo="day"
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          // allowSameDateSelection={true}
          // disableCloseOnSelect={false}
          value={dayjs(value)}
          disabled={disabled}
          ref={inputRef}
          autoFocus={autoFocus}
          onChange={onChangeHandler}
          slots={{
            inputAdornment: isDesktop ? CalendarInputAdornment : undefined,
          }}
          slotProps={{
            textField: {
              id: id,
              variant: "standard",
              className: cx(
                classes.datePicker,
                inputStatus === "error" ? classes.inputError : null,
                inputStatus === "success" ? classes.inputSuccess : null,
              ),
              InputProps: {
                disableUnderline: true,
                classes: {
                  input: classes.input,
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default React.forwardRef(CustomDateTimePickerComponent);
