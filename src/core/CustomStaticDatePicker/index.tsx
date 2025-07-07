import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";

type CustomStaticDatePickerProps = {
  calendarDialogOpen: boolean;
  setCalendarDialogOpen: (open: boolean) => void;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  yearOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  shouldDisableDate?: (day: Dayjs) => boolean;
  designStyle?: "solid" | "bordered";
};

const CustomStaticDatePickerDialog: React.FC<CustomStaticDatePickerProps> = ({
  calendarDialogOpen,
  setCalendarDialogOpen,
  value,
  onChange,
}) => {
  return (
    <Dialog
      open={calendarDialogOpen}
      onClose={() => {
        setCalendarDialogOpen(false);
      }}
      aria-labelledby="responsive-dialog-title"
      disableEnforceFocus={true}
    >
      <DialogContent style={{ minWidth: "unset", padding: 30 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
          <StaticDatePicker<Dayjs>
            value={dayjs(value)}
            onChange={(date) => {
              if (!date) return null;
              onChange(date.toDate());
            }}
            slots={{
              actionBar: () => null,
              switchViewButton: () => null,
              toolbar: () => null,
            }}
            views={["month", "day"]}
          />
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CustomStaticDatePickerDialog;
