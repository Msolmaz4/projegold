import React, { useRef } from "react";
import { IconButton, InputAdornment, InputBase } from "@mui/material";
import { CloseDuoIcon, SearchIcon, SettingsDuoIcon } from "icons";
import Loading from "../Loading";
import useStyles from "./styles";

type SearchInputFieldProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  isLoadingSearch?: boolean;
  onClickSettings?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  placeholder?: string;
};

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  className,
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  isLoadingSearch,
  onClickSettings,
  placeholder = "Suche...",
}) => {
  const { classes, cx } = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);

  const resetHandler = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <InputBase
      autoFocus={autoFocus}
      classes={{
        root: cx(classes.root, className),
        input: cx(classes.input, value.length < 3 ? classes.inputInvalid : ""),
        focused: classes.focusedInput,
      }}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      inputRef={inputRef}
      disabled={disabled}
      startAdornment={
        <InputAdornment
          position="end"
          classes={{ root: classes.searchAdornment }}
        >
          <SearchIcon className={classes.searchIcon} />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment
          position="start"
          classes={{ root: classes.buttonAdornment }}
        >
          {isLoadingSearch ? (
            <Loading size="15px" style={{ margin: 0, marginRight: 7 }} />
          ) : value.length > 0 ? (
            <IconButton className={classes.iconButton} onClick={resetHandler}>
              <CloseDuoIcon className={classes.resetIcon} />
            </IconButton>
          ) : (
            <IconButton
              className={classes.iconButton}
              onClick={onClickSettings}
            >
              <SettingsDuoIcon className={classes.settingsIcon} />
            </IconButton>
          )}
        </InputAdornment>
      }
    />
  );
};

export default SearchInputField;
