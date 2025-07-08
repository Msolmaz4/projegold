import React, { useState } from "react";
import { Grid2, Typography } from "@mui/material";
import { useUserRead, useUserRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import {
  getTableHeaderColorName,
  getTableSpacingName,
  getTableThemeName,
} from "options";
import { User } from "types";
import { CustomAvatar, CustomButton, LabeledTypography } from "core";
import { BoxLoadingDetails, DeleteIcon, EditIcon } from "components";
import UserDeleteDialog from "../../userDelete/UserDeleteDialog";
import utils from "utils";

const UserPage: React.FC = () => {
  const { user, isLoading } = useUserRead();
  const { navigateToEditUserPage } = useUserRoutes();

  const [deleteUserDialogOpen, setDeleteUserDialogOpen] =
    useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User>();

  if (isLoading || !user) {
    return (
      <BoxLoadingDetails
        isLoading={isLoading}
        entityName="Benutzer"
        entity={user}
      />
    );
  }

  return (
    <BoxHeadlineContainer
      boxTitle={
        !isLoading && user
          ? user.firstName + " " + user.lastName
          : "Benutzer-Details"
      }
      marginTop={false}
      boxWidth="lg"
      boxMenu={
        <>
          <CustomButton
            text="Bearbeiten"
            iconBefore={<EditIcon />}
            onClick={() => navigateToEditUserPage(user)}
            size="small"
            color="blue"
            marginRight={15}
          />
          <CustomButton
            text="Löschen"
            iconBefore={<DeleteIcon />}
            onClick={() => {
              setUserToDelete(user);
              setDeleteUserDialogOpen(true);
            }}
            size="small"
            color="red"
          />
        </>
      }
    >
      <UserDeleteDialog
        dialogOpen={deleteUserDialogOpen}
        setDialogOpen={setDeleteUserDialogOpen}
        user={userToDelete}
      />
      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Anrede"
            content={user.salutation === "Mrs" ? "Frau" : "Herr"}
          />
        </Grid2>

        <Grid2 size={4}>
          <LabeledTypography label="Vorname" content={user.firstName} />
        </Grid2>

        <Grid2 size={4}>
          <LabeledTypography label="Nachname" content={user.lastName} />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography label="E-Mail-Adresse" content={user.email} />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography label="Benutzername" content={user.username} />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography label="UserSUB" content={user.userSUB} />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography label="Telefon" content={user.phone} />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography label="Fax" content={user.fax} />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Benutzerbild"
            content={
              <CustomAvatar
                showBadge={false}
                size="100px"
                s3Resource={user.avatar}
              />
            }
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Rollen"
            content={user.cognitoUser?.groups
              .map((group) => group.GroupName)
              .join(", ")}
          />
        </Grid2>
      </Grid2>

      <Typography variant="h2">Benutzereinstellungen</Typography>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellen-Theme"
            content={getTableThemeName(user.userSettings.tableTheme)}
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellenkopf-Farbe"
            content={getTableHeaderColorName(
              user.userSettings.tableHeaderColor,
            )}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellen-Abstand"
            content={getTableSpacingName(user.userSettings.tableSpacing)}
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellenkopf fixieren"
            content={user.userSettings.tableSticky ? "Ja" : "Nein"}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Bevorzugte Einheit"
            content={
              utils.constants.WEIGHT_OPTIONS.find(
                (weightOption) =>
                  weightOption.value === user!.userSettings.unitType,
              )?.label
            }
          />
        </Grid2>
      </Grid2>
    </BoxHeadlineContainer>
  );
};

export default UserPage;
