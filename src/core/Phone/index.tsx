import React, { useImperativeHandle, useRef, useState } from "react";
import {
  FormControl,
  Grid2,
  InputAdornment,
  InputBase,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CheckmarkDoneIcon, InfoRoundIcon } from "icons";
import { nanoid } from "nanoid";
import { scroller } from "react-scroll";
import Select, {
  ActionMeta,
  GroupBase,
  SingleValueProps,
  StylesConfig,
  components,
} from "react-select";
import { CustomFormLabelProps, FieldHandles } from "types";
import CustomFormLabel from "../CustomFormLabel";
import { DEFAULT_PHONE_PREFIX, PREFIXES_TYPE } from "utils/phone";
import utils from "utils";
import useStyles from "./styles";

interface PhoneProps extends CustomFormLabelProps {
  label: string;
  description?: string;
  prefixValue: PREFIXES_TYPE;
  prefixOnChange: (
    value: PREFIXES_TYPE,
    actionMeta: ActionMeta<PREFIXES_TYPE>,
  ) => void;
  className?: string;
  phoneValue: string;
  phoneOnChange: (value: string) => void;
  validate?: (value: string) => boolean;
  required?: boolean;
}

const PhoneComponent: React.ForwardRefRenderFunction<
  FieldHandles,
  PhoneProps
> = (
  {
    prefixValue,
    prefixOnChange,
    className,
    phoneValue,
    phoneOnChange,
    validate,
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
  phoneFieldRef,
) => {
  const { classes, cx } = useStyles();

  const theme = useTheme();
  const mediaQueryXSDown = useMediaQuery(theme.breakpoints.down("xs"));

  const [inputStatus, setInputStatus] = useState<
    "success" | "error" | "default"
  >("default");

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(phoneFieldRef, () => ({
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

  const phoneOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (event.target.value === "" || /^[ 0-9x#]+$/.test(event.target.value)) &&
      !event.target.value.includes("  ")
    ) {
      phoneOnChange(event.target.value);
    }
  };

  type IsMulti = false;

  const selectStyle: StylesConfig<PREFIXES_TYPE, IsMulti> = {
    container: (base) => ({
      ...base,
      "&:hover": {
        borderColor: "#3da894 !important",
      },
      border: "1px solid #a9bebb",
      borderRadius: "4px",
      boxShadow: "0 1px 2px 0px rgba(0, 0, 0, 0.08)",
    }),
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
      backgroundColor: "#fff",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 5,
      border: "1px solid #a9bebb",
      borderRadius: 4,
      boxShadow: "none",
      minWidth: "211px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#f2f9fa"
        : state.isFocused
          ? "#fafafc"
          : "none",
      color: "#333333",
      padding: 7,
      textAlign: "left",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 8,
    }),
    indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
  };

  const SingleValue = (
    props: SingleValueProps<PREFIXES_TYPE, false, GroupBase<PREFIXES_TYPE>>,
  ) => (
    <components.SingleValue {...props}>
      {props.data.prefix}
    </components.SingleValue>
  );

  return (
    <FormControl
      classes={{
        root: cx(
          className || classes.formControlRoot,
          validate && inputStatus === "error" ? classes.inputError : null,
          validate && inputStatus === "success" ? classes.inputSuccess : null,
        ),
      }}
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
      />

      <Grid2
        justifyContent="space-between"
        alignItems="center"
        container
        direction="row"
        spacing={mediaQueryXSDown ? 0 : 0}
      >
        <Grid2 size={{ xs: 3 }}>
          <Select<PREFIXES_TYPE>
            openMenuOnFocus={true}
            value={prefixValue}
            styles={selectStyle}
            options={utils.phone.PHONE_PREFIXES}
            components={{ SingleValue }}
            onChange={(value, actionMeta) =>
              prefixOnChange(value ?? DEFAULT_PHONE_PREFIX, actionMeta)
            }
            className={classes.phonePrefix}
            isSearchable={true}
            tabSelectsValue={false}
            menuPortalTarget={document.body}
          />
        </Grid2>
        <Grid2 className={classes.gridPhone} size={{ xs: 7, sm: 9 }}>
          <InputBase
            type="text"
            value={phoneValue}
            onChange={phoneOnChangeHandler}
            className={classes.phoneNumber}
            inputRef={inputRef}
            inputProps={{ id: id }}
            classes={{
              root: classes.root,
              input: classes.input,
              focused: classes.focusedInput,
            }}
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
                    <span style={{ lineHeight: 0 }}>
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
                    <span style={{ lineHeight: 0 }}>
                      <InfoRoundIcon className={classes.errorIcon} />
                    </span>
                  </Slide>
                ) : null}
              </InputAdornment>
            }
          />
        </Grid2>
      </Grid2>
    </FormControl>
  );
};

export default React.forwardRef(PhoneComponent);
