import { FC, Suspense, useEffect, useRef } from "react";
import {
  NonIndexRouteObject,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { datadogRum } from "@datadog/browser-rum";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import * as Sentry from "@sentry/react";
//import { QueryClientProvider } from "@tanstack/react-query";
import { useAuthContext, useUserActivityTracker } from "hooks";
import { AuthLayout, Layout, StateContainer } from "layout";
import { Loading } from "core";
import { ErrorPage } from "./components";
import {
  AppRoutes,
  AuthRoutes,
  getSubNavigationsAsArray,
  isAuthRoute,
} from "routes";
import AuthContextProvider from "./context/auth-context-provider";
import DataContextProvider from "./context/data-context-provider";
import LayoutContextProvider from "./context/layout-context-provider";
import SearchContextProvider from "./context/search-context-provider";

import theme from "./theme";
import "./styles/calendar.css";
import "./styles/editor.css";
import "./styles/index.css";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

const Main: FC = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const ref = useRef<HTMLDivElement>(null);

  useUserActivityTracker();

  useEffect(() => {
    // if (process.env.NODE_ENV !== "production") return;

    datadogRum.init({
      applicationId: "d106b8662d04101b0f7c292e50e1dcf59f68cc4e",
      clientToken: "pub913356ff874ac2f3a29e5c0948413e1e",
      site: "datadoghq.eu",
      service: "blueprint-react",
      env: "production",
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

  useEffect(() => {
    if (!authContext.initAuth || authContext.isLoading) {
      return;
    }

    if (authContext.isAuth || isAuthRoute(pathname)) {
      return;
    }

    navigate(AuthRoutes.login);
  }, [
    authContext.isLoading,
    authContext.isAuth,
    authContext.initAuth,
    navigate,
    pathname,
  ]);

  const authRoute = isAuthRoute(pathname);

  return (
    <Suspense
      fallback={<Loading description="Bitte warten. Seite wird geladen..." />}
    >
      <Layout>
        <div className="App" ref={ref}>
          {authRoute ? (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ) : (
            <Outlet />
          )}
        </div>
      </Layout>
    </Suspense>
  );
};

const RootStart: FC = () => {
  useEffect(() => {
    console.log("RootStart mounted");
  }, []);

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <SearchContextProvider>
            <LayoutContextProvider>
              <DataContextProvider>
                <CssBaseline />
                <Sentry.ErrorBoundary
                  fallback={({ eventId }) => (
                    <ErrorPage
                      errorTitle="Oops!"
                      eventID={eventId}
                      errorMessage="Leider ist ein Fehler aufgetreten."
                    />
                  )}
                >
                  <StateContainer>
                    <ScrollRestoration
                      getKey={(location) => location.pathname}
                    />
                    <Main />
                  </StateContainer>
                </Sentry.ErrorBoundary>
              </DataContextProvider>
            </LayoutContextProvider>
          </SearchContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

const routes: NonIndexRouteObject[] = [
  {
    path: "/",
    element: <RootStart />,
    children: getSubNavigationsAsArray(AppRoutes),
  },
];

const browserRouter = createBrowserRouter(routes);

const Root: FC = () => {
  return <RouterProvider router={browserRouter} />;
};

export default Root;
