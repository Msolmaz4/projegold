import  { useCallback, useEffect, useState } from "react";
import * as Sentry from "@sentry/react";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import ErrorPage from "../../components/ErrorPage";

export const NoRouteMatch: React.FC = () => {
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

      scope.setContext("userData", {
        ...authContext.userData, 
      });

      scope.setContext("user", {
        ...authContext.cognitoUser, 
      });
    }

    scope.setContext("environment", {
      environment: process.env.NODE_ENV,
    });

    const eventID = Sentry.captureException(
      new Error("User called an unknown URL: " + window.location.href)
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
    <ErrorPage
      errorTitle="Nanu!"
      eventID={eventID}
      errorMessage="Wir konnten die Seite leider nicht finden."
    />
  ) : (
    <ErrorPage
      errorTitle="Nanu!"
      eventID={eventID}
      errorMessage="Wir konnten die Seite leider nicht finden."
    />
  );
};
