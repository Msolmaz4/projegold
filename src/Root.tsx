// src/Root.tsx
import {type FC, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  type NonIndexRouteObject,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { datadogRum } from "@datadog/browser-rum";
import UserContextProvider from "./context/user-context-provider";
import { AppRoutes, getSubNavigationsAsArray, isAuthRoute } from "./rootes";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import AuthContextProvider from "./context/auth-context-provider";
import { Loading } from "./core";

const ProtectedRoutes: FC = () => {
  const authContext = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isOnAuthRoute = isAuthRoute(location.pathname);

  useEffect(() => {
    datadogRum.init({
      applicationId: "37127132-a5b7-4d78-af01-86960aaafb28",
      clientToken: "pub913356ff874ac2f3a29e5c0948413e1e",
      site: "datadoghq.eu",
      service: "my-local-test",
      env: "development",
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackSessionAcrossSubdomains: true,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "allow",
    });

    datadogRum.startSessionReplayRecording();
  }, []);

  useEffect(() => {
    if (!authContext.initAuth) {
      if (!authContext.initAuth) {
        navigate("/login", { replace: true });
      }
    }
  }, [authContext.initAuth, isOnAuthRoute, navigate]);

  if (!authContext.initAuth && isOnAuthRoute) {
    // Wenn wir uns auf einer Auth-Seite befinden, wird der Outlet ohne Warten auf initAuth gerendert (z. B. Login, Passwort vergessen, Registrierung)
    return <Outlet />;
  }

  if (!authContext.initAuth) {
    // „Wenn initAuth false ist und wir uns nicht auf einer Auth-Seite befinden → Es kann ein Ladebildschirm angezeigt oder eine Weiterleitung durchgeführt werden (oben wurde bereits weitergeleitet).
    return <Loading description="Bitte warten..." />;
  }
  //alles okey weiter
  return <Outlet />;
};

const RootStart: FC = () => {
  return (
    <UserContextProvider>
      <AuthContextProvider>
        <ProtectedRoutes />
      </AuthContextProvider>
    </UserContextProvider>
  );
};

const routes: NonIndexRouteObject[] = [
  {
    path: "/",
    element: <RootStart />,
    children: getSubNavigationsAsArray(AppRoutes),
  },
];

const router = createBrowserRouter(routes);

const Root: FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
