import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useAuthContext } from "hooks";
import { QueryKeys, client, queryClient } from "queryClient";
import { CustomDialog } from "core";
import { GLOBAL_SETTINGS_ID } from "utils/constants";

const NewVersionTracker: React.FC = () => {
  const authContext = useAuthContext();

  const [newVersionAvailable, setNewVersionAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    if (!authContext.globalSettings) {
      return;
    }

    const updateSub = client.models.GlobalSettings.onUpdate({
      filter: {
        id: {
          eq: GLOBAL_SETTINGS_ID,
        },
      },
    }).subscribe({
      next: (globalSettings) => {
        if (!globalSettings || !authContext.globalSettings) {
          return;
        }

        const currentVersion = globalSettings.currentVersion;

        if (
          currentVersion &&
          currentVersion !== authContext.globalSettings.currentVersion
        ) {
          setNewVersionAvailable(true);
        }

        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GlobalSettings],
        });
      },
      error: (error) => console.error(error),
    });

    return () => {
      updateSub.unsubscribe();
    };
  }, [authContext.globalSettings]);

  return (
    <CustomDialog
      confirmText="Seite neu laden"
      dialogOpen={newVersionAvailable}
      positive={false}
      titleText="Neue Version verfügbar"
      setDialogOpen={setNewVersionAvailable}
      confirmAction={() => window.location.reload()}
      showConfirm={true}
      showDecline={true}
      maxWidth="md"
    >
      <Typography align="center" variant="h3">
        Es ist eine neue Version für den Aymando CRM verfügbar.
        <br />
        <br />
        Bitte laden Sie die Seite neu, um die neue Version zu verwenden.
      </Typography>
    </CustomDialog>
  );
};

export default NewVersionTracker;
