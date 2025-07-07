import React, { useImperativeHandle, useMemo, useRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
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

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isSelected: boolean;
  isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 0 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

function Day(
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
  },
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

interface CustomDateWeekPickerProps extends CustomFormLabelProps {
  value: Date | null;
  onChange: (date: Date | null, value?: string | null | undefined) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  resettable?: boolean;
}

const CustomDateWeekPickerComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  CustomDateWeekPickerProps
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

  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);

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
    console.log("date Moment: ", date);
    console.log("date: ", date?.toDate());
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
        {value && (
          <Typography className={classes.kwAnzeige}>
            {"KW " + dayjs(value).isoWeek()}
          </Typography>
        )}
      </InputAdornment>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputStatus, resettable, disabled, value],
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
        <DatePicker<Dayjs>
          open={isDesktop ? pickerStatus : undefined}
          onClose={isDesktop ? () => setPickerStatus(false) : undefined}
          minDate={minDate ? dayjs(minDate) : undefined}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          // allowSameDateSelection={true}
          // disableCloseOnSelect={false}
          showDaysOutsideCurrentMonth={true}
          displayWeekNumber={true}
          value={dayjs(value)}
          disabled={disabled}
          ref={inputRef}
          autoFocus={autoFocus}
          onChange={onChangeHandler}
          slots={{
            inputAdornment: isDesktop ? CalendarInputAdornment : undefined,
            day: Day,
          }}
          slotProps={{
            day: (ownerState) =>
              ({
                selectedDay: value,
                hoveredDay,
                onPointerEnter: () => setHoveredDay(ownerState.day),
                onPointerLeave: () => setHoveredDay(null),
              }) as any,
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

export default React.forwardRef(CustomDateWeekPickerComponent);
