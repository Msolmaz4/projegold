import React, { useImperativeHandle, useRef, useState } from "react";
import {
  ClickAwayListener,
  InputAdornment,
  InputBase,
  Slide,
} from "@mui/material";
import { CheckmarkDoneIcon, InfoRoundIcon } from "icons";
import { nanoid } from "nanoid";
import PlacesAutocomplete from "react-places-autocomplete";
import { scroller } from "react-scroll";
import { CustomFormLabelProps, FieldHandles } from "types";
import { CustomFormLabel } from "core";
import useStyles from "./styles";

interface LocationSearchInputProps extends CustomFormLabelProps {
  handleAddressSelect: ((address: string, placeID: string) => void) | undefined;
  handleAddressChange: (value: string) => void;
  autocompleteAddress: string | undefined;
  placeholder?: string;
  inputRootClass?: string;
  inputClass?: string;
  validate?: (value: string) => boolean;
  required?: boolean;
  autoFocus?: boolean;
}

const LocationSearchInput: React.ForwardRefRenderFunction<
  FieldHandles,
  LocationSearchInputProps
> = (
  {
    handleAddressSelect,
    handleAddressChange,
    autocompleteAddress,
    placeholder,
    inputRootClass,
    validate,
    required = false,
    autoFocus = false,

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
  locationSearchInputRef,
) => {
  const { classes, cx } = useStyles();

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const [suggestionsVisible, setSuggestionsVisible] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(locationSearchInputRef, () => ({
    highlight: (scroll = true) => {
      setInputStatus("error");
      if (scroll) {
        scroller.scrollTo(id, {
          smooth: true,
          offset: -150,
          duration: 700,
        });
      }
      inputRef.current?.focus();
    },
  }));

  const onChangeHandler = (value: string) => {
    setSuggestionsVisible(true);
    handleAddressChange(value);
    if (validate) {
      const isValid = validate(value);
      if (isValid) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    }
  };

  const onBlurHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSuggestionsVisible(false);
    handleAddressChange(e.target.value);
    if (validate) {
      const isValid = validate(e.target.value);
      if (isValid) {
        setInputStatus("success");
      } else {
        setInputStatus("error");
      }
    } else {
      setInputStatus("default");
    }
  };

  return (
    <div
      className={cx(
        classes.locationSearchInputRoot,
        validate && inputStatus === "error" ? classes.inputError : null,
        validate && inputStatus === "success" ? classes.inputSuccess : null,
      )}
    >
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
        errorLabel={validate && inputStatus === "error"}
      />

      <PlacesAutocomplete
        value={autocompleteAddress}
        onChange={onChangeHandler}
        onSelect={handleAddressSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={cx(classes.autocompleteContainer, inputRootClass)}>
            <InputBase
              classes={{
                root: classes.root,
                input: cx(classes.input),
                focused: classes.focusedInput,
              }}
              name={id}
              id={id}
              inputRef={inputRef}
              placeholder={placeholder}
              {...getInputProps({})}
              autoFocus={autoFocus}
              onBlur={onBlurHandler}
              endAdornment={
                <InputAdornment position="start">
                  {validate && inputStatus === "success" ? (
                    <Slide
                      direction="right"
                      in={inputStatus === "success"}
                      mountOnEnter
                      unmountOnExit
                      timeout={700}
                    >
                      <span>
                        <CheckmarkDoneIcon className={classes.successIcon} />
                      </span>
                    </Slide>
                  ) : null}
                  {validate && inputStatus === "error" ? (
                    <Slide
                      direction="right"
                      in={inputStatus === "error"}
                      mountOnEnter
                      unmountOnExit
                      timeout={700}
                    >
                      <span>
                        <InfoRoundIcon className={classes.errorIcon} />
                      </span>
                    </Slide>
                  ) : null}
                </InputAdornment>
              }
            />

            <ClickAwayListener onClickAway={() => setSuggestionsVisible(false)}>
              <div
                className={classes.autocompleteDropdownContainer}
                style={{
                  display:
                    suggestionsVisible && suggestions.length ? "block" : "none",
                }}
              >
                <div className={classes.menuList}>
                  {loading && <div>Lädt...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? classes.suggestionItemActive
                      : classes.suggestionItem;
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                        key={suggestion.id}
                      >
                        <span className={classes.suggestion}>
                          {suggestion.description}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ClickAwayListener>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default React.forwardRef(LocationSearchInput);
