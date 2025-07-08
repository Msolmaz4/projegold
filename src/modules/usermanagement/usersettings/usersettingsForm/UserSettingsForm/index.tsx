import React, { useImperativeHandle, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid2, Typography } from "@mui/material";
import { useLayoutContext } from "hooks";
import {
  SalutationOption,
  TableHeaderColorOption,
  TableSpacingOption,
  TableThemeOption,
} from "options";
import {
  CreateUserInput,
  FieldHandles,
  SelectOption,
  UserSettingsFormHandles,
} from "types";
import {
  AvatarDropZone,
  CustomButton,
  CustomSelect,
  CustomSwitch,
  Phone,
  TextInputField,
} from "core";
import { AppRoutes } from "routes";
import useUserSettingsForm from "../useUserSettingsForm";
import { normalizePhone } from "utils/phone";
import utils from "utils";

type UserSettingsFormProps = {
  submitUserSettings: () => void;
  submitLoading: boolean;
  user: CreateUserInput;
};

const UserSettingsFormComponent: React.ForwardRefRenderFunction<
  UserSettingsFormHandles,
  UserSettingsFormProps
> = ({ submitUserSettings, submitLoading, user }, userFormRef) => {
  const navigate = useNavigate();
  const { notify } = useLayoutContext();

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    salutation,
    setSalutation,
    avatar,
    setAvatar,
    phone,
    setPhone,
    phonePrefix,
    setPhonePrefix,
    fax,
    setFax,
    faxPrefix,
    setFaxPrefix,
    tableTheme,
    setTableTheme,
    tableHeaderColor,
    setTableHeaderColor,
    tableSpacing,
    setTableSpacing,
    tableSticky,
    setTableSticky,
    unitType,
    setUnitType,
    uploading,
    setUploading,
    uploadProgress,
    setUploadProgress,
  } = useUserSettingsForm();

  const salutationInputRef = useRef<FieldHandles>(null);
  const firstNameInputRef = useRef<FieldHandles>(null);
  const lastNameInputRef = useRef<FieldHandles>(null);

  const tableThemeInputRef = useRef<FieldHandles>(null);
  const tableHeaderColorInputRef = useRef<FieldHandles>(null);
  const tableSpacingInputRef = useRef<FieldHandles>(null);

  useImperativeHandle(userFormRef, () => ({
    validateUserSettingsForm: async () => {
      if (salutation === null) {
        notify("Bitte wähle die Anrede aus!");
        salutationInputRef.current?.highlight();
        return null;
      }

      if (firstName === "") {
        notify("Bitte gib deinen Vornamen ein!");
        firstNameInputRef.current?.highlight();
        return null;
      }

      if (lastName === "") {
        notify(
          "Bitte gib den Schwellwert für das Überschreiten der Gesamt-Liefermenge einer Lieferung bei Eingabe des Giesslaufs ein!",
        );
        lastNameInputRef.current?.highlight();
        return null;
      }

      if (tableTheme === null) {
        notify("Bitte wähle das Tabellenthema aus!");
        tableThemeInputRef.current?.highlight();
        return null;
      }

      if (tableHeaderColor === null) {
        notify("Bitte wähle die Tabellenkopffarbe aus!");
        tableHeaderColorInputRef.current?.highlight();
        return null;
      }

      if (tableSpacing === null) {
        notify("Bitte wähle den Tabellenabstand aus!");
        tableSpacingInputRef.current?.highlight();
        return null;
      }

      const uploadedBild = await utils.images.uploadS3Resource(
        avatar,
        "user",
        setUploading,
        setUploadProgress,
      );

      const userSettingsFormInput: CreateUserInput = {
        isUserActive: true,
        email: user.email,
        userSUB: user.userSUB,
        username: user.username,
        firstName: firstName,
        lastName: lastName,
        salutation: salutation,
        avatar: uploadedBild,
        phone: normalizePhone(phonePrefix, phone),
        fax: normalizePhone(faxPrefix, fax),
        userSettings: {
          tableTheme,
          tableHeaderColor,
          tableSpacing,
          tableSticky,
          unitType: unitType.value,
        },
        lastActive: user.lastActive,
      };

      return userSettingsFormInput;
    },
  }));

  return (
    <>
      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={6}>
          <SalutationOption
            salutation={salutation}
            setSalutation={setSalutation}
            salutationInputRef={salutationInputRef}
          />
        </Grid2>
      </Grid2>
      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={4}>
          <TextInputField
            id="Vorname"
            label="Vorname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            ref={firstNameInputRef}
            required={true}
            validate={(value) => value.trim() !== ""}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextInputField
            label="Nachname"
            id="Nachname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            ref={lastNameInputRef}
            required={true}
            validate={(value) => value.trim() !== ""}
          />
        </Grid2>
      </Grid2>
      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={4}>
          <Phone
            label="Telefon"
            phoneOnChange={(value) => setPhone(value)}
            phoneValue={phone}
            prefixOnChange={(value) => value && setPhonePrefix(value)}
            prefixValue={phonePrefix}
          />
        </Grid2>
        <Grid2 size={4}>
          <Phone
            label="Fax"
            phoneOnChange={(value) => setFax(value)}
            phoneValue={fax}
            prefixOnChange={(value) => value && setFaxPrefix(value)}
            prefixValue={faxPrefix}
          />
        </Grid2>
      </Grid2>
      <Typography variant="h3">Benutzerbild</Typography>
      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={6}>
          <AvatarDropZone
            dragActiveText="Bild hier ablegen..."
            dragInactiveText="Bild hier ablegen oder klicken..."
            uploading={uploading}
            avatar={avatar}
            setAvatar={setAvatar}
            maxSize={10000000}
            uploadProgress={uploadProgress}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={6}>
          <CustomSelect<SelectOption>
            value={unitType}
            label="Bevorzugte Einheit"
            placeholder="Bitte auswählen"
            options={utils.constants.WEIGHT_OPTIONS}
            onChange={(value) => value && setUnitType(value)}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={6}>
          <TableThemeOption
            tableTheme={tableTheme}
            setTableTheme={setTableTheme}
            tableThemeInputRef={tableThemeInputRef}
          />
        </Grid2>
        <Grid2 size={6}>
          <TableHeaderColorOption
            tableHeaderColor={tableHeaderColor}
            setTableHeaderColor={setTableHeaderColor}
            tableHeaderColorInputRef={tableHeaderColorInputRef}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" alignItems="center" spacing={4}>
        <Grid2 size={6}>
          <TableSpacingOption
            tableSpacing={tableSpacing}
            setTableSpacing={setTableSpacing}
            tableSpacingInputRef={tableSpacingInputRef}
          />
        </Grid2>
        <Grid2 size={6}>
          <CustomSwitch
            name="tableSticky"
            switchLabel="Tabellenkopf fixieren"
            checkedValue={tableSticky}
            onChange={(value) => setTableSticky(value.target.checked)}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2>
          <CustomButton
            text="Einstellungen speichern"
            onClick={() => submitUserSettings()}
            loading={submitLoading}
            style="filled"
          />
        </Grid2>
        <Grid2>
          <CustomButton
            color="red"
            text="Abbrechen"
            onClick={() => {
              navigate(AppRoutes.start.path);
            }}
            disabled={submitLoading}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default React.memo(React.forwardRef(UserSettingsFormComponent));
