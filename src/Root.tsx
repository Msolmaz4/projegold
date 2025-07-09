// src/Root.tsx
import { FC, Suspense, useEffect, useRef } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
  type NonIndexRouteObject,
} from "react-router-dom";
import { datadogRum } from "@datadog/browser-rum";
import UserContextProvider from "./context/user-context-provider";
import MainLayout from "./components/MainLayout";
import { AppRoutes, getSubNavigationsAsArray, isAuthRoute } from "./rootes";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import { Loading } from "./core";
import LoginPage from "./auth/Login";
import AuthContextProvider from "./context/auth-context-provider";

const Main: FC = () => {
  const authContext = useAuthContext();
  console.log(authContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  console.log(pathname);

  const ref = useRef();

  useEffect(() => {
    // if (process.env.NODE_ENV !== "production") return;

    // https://app.datadoghq.eu
    //rasimsolmaz9@gmail.com
    datadogRum.init({
      applicationId: "37127132-a5b7-4d78-af01-86960aaafb28",
      clientToken: "pub913356ff874ac2f3a29e5c0948413e1e",
      site: "datadoghq.eu",
      service: "my-local-test",
      env: "development",
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
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
    if (!authContext.initAuth || authContext.isLoading) {
      return;
    }
    if (!authContext.isAuth || !isAuthRoute(pathname)) {
      return;
    }
    navigate("/");
  }, [
    authContext.isLoading,
    authContext.isAuth,
    authContext.initAuth,
    navigate,
    pathname,
  ]);

  const authRoute = isAuthRoute(pathname);
  console.log(authRoute);

  return (
    <Suspense fallback={<Loading description=" bitte warten............." />}>
      <LoginPage />
    </Suspense>
  );
};

const RootStart: FC = () => {
  useEffect(() => {
    console.log("Root mounted");
  });

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Main />
      </UserContextProvider>
    </AuthContextProvider>
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
