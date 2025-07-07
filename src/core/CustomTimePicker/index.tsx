import React, {
  CSSProperties,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IconButton,
  InputAdornment,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";
import { CheckmarkDoneIcon, InfoRoundIcon, TimeIcon } from "icons";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import useStyles from "./styles";

interface CustomTimePickerProps extends CustomFormLabelProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  disabled?: boolean;
  onlyHours?: boolean;
  marginBottom?: boolean;
  minutesStep?: number;
  maxWidth?: CSSProperties["maxWidth"];
  showPicker?: boolean;
}

const CustomTimePickerComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomTimePickerProps
> = (
  {
    value,
    onChange,
    required = false,
    disabled = false,
    onlyHours = false,
    marginBottom = true,
    minutesStep,
    maxWidth,
    showPicker = false,

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
  customTimePickerRef,
) => {
  const { classes, cx } = useStyles();

  const isDesktop = useMediaQuery("@media (pointer: fine)");

  const [pickerStatus, setPickerStatus] = useState<boolean>(false);
  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(customTimePickerRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -200,
          duration: 700,
        });
      }
      inputRef.current?.focus();
    },
  }));

  const onChangeHandler = (date: Dayjs | null) => {
    onChange(date ? date.toDate() : null);
    if (required) {
      if (
        date !== null &&
        date.toDate() instanceof Date &&
        !isNaN(date.toDate().getTime())
      ) {
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
            <span className={classes.successIconSpan}>
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
            <span className={classes.errorIconSpan}>
              <InfoRoundIcon className={classes.errorIcon} />
            </span>
          </Slide>
        ) : null}
        {showPicker && (
          <IconButton
            className={cx(
              inputStatus === "default"
                ? classes.datePickerButtonSingle
                : classes.datePickerButton,
            )}
            onClick={() => setPickerStatus((prev) => !prev)}
            disabled={disabled}
          >
            <TimeIcon
              className={cx(
                disabled ? classes.calendarIconDisabled : classes.calendarIcon,
              )}
            />
          </IconButton>
        )}
      </InputAdornment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, showPicker, inputStatus],
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
        <TimePicker<Dayjs>
          ampmInClock
          views={onlyHours ? ["hours"] : ["hours", "minutes"]}
          format="HH:mm"
          open={isDesktop ? pickerStatus : undefined}
          onClose={isDesktop ? () => setPickerStatus(false) : undefined}
          value={dayjs(value)}
          ampm={false}
          disableOpenPicker={disabled}
          minutesStep={minutesStep}
          onChange={onChangeHandler}
          className={cx(
            classes.datePicker,
            marginBottom ? classes.marginBottom : null,
            inputStatus === "error" ? classes.inputError : null,
            inputStatus === "success" ? classes.inputSuccess : null,
          )}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          slots={{
            inputAdornment: isDesktop ? CalendarInputAdornment : undefined,
          }}
          slotProps={{
            popper: {
              placement: "bottom-end",
            },
            textField: {
              variant: "standard",
              name: id,
              id: id,
              disabled: disabled,
              inputRef: inputRef,
              style: {
                maxWidth: maxWidth,
              },
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

export default React.forwardRef(CustomTimePickerComponent);
