import React, { useCallback, useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { getUserRoleName } from "../../modules/usermanagement/roles/api"
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import ErrorPage from "../../components/ErrorPage";
import { Loading } from "../../core";

type NoRouteAccessProps = {
  groups: string[];
};

export const NoRouteAccess: React.FC<NoRouteAccessProps> = ({ groups }) => {
  const authContext = useAuthContext();

  const [eventID, setEventID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const logErrorToSentry = useCallback(() => {
  Sentry.withScope((scope) => {
    if (
      authContext.isAuth &&
      authContext.cognitoUser &&
      authContext.userData
    ) {
      scope.setUser({
        username: authContext.cognitoUser.username,
        email: authContext.cognitoUser.email,
        id: authContext.userData.id,
        name:
          authContext.cognitoUser.firstName +
          " " +
          authContext.cognitoUser.lastName,
      });

    
      scope.setContext("userData", { ...authContext.userData });
      scope.setContext("user", { ...authContext.cognitoUser });
    }

    scope.setContext("environment", {
      environment: process.env.NODE_ENV,
    });

    const eventID = Sentry.captureException(
      new Error(
        "User tried to access not allowed role URL: " + window.location.href
      )
    );

    setEventID(eventID);
    setLoading(false);
  });
}, [authContext.cognitoUser, authContext.userData, authContext.isAuth]);


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logErrorToSentry();
    }
    return () => {
      isMounted = false;
    };
  }, [logErrorToSentry]);

  return loading ? (
    <Loading size="33px" />
  ) : (
    <ErrorPage
      errorTitle="Halt Stopp!"
      eventID={eventID}
      errorMessage="Zugriff auf diese Seite verweigert!"
      errorDescription={
        "Um auf diese Seite zugreifen zu können, benötigen Sie eine der folgenden Rollen: " +
        groups.map((group) => getUserRoleName(group)).join(", ")
      }
    />
  );
};
