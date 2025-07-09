// src/Root.tsx
import { FC, Suspense, useEffect, useRef } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
  Outlet,
  type NonIndexRouteObject,
} from "react-router-dom";
import { datadogRum } from "@datadog/browser-rum";
import UserContextProvider from "./context/user-context-provider";
import { AppRoutes, getSubNavigationsAsArray, isAuthRoute } from "./rootes";
import { useAuthContext } from "./hooks/auth/useAuthContext";
import { Loading } from "./core";
import AuthContextProvider from "./context/auth-context-provider";
import LoginPage from "./auth/Login";

const ProtectedRoutes: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const isOnAuthRoute = isAuthRoute(pathname);

  useEffect(() => {
    if (!authContext.initAuth || authContext.isLoading) return;

    // Eğer kullanıcı giriş yapmamış ve auth sayfasında değilse → login'e yönlendir
    if (!authContext.isAuth && !isOnAuthRoute) {
      navigate("/login", { replace: true });
    }

    // Eğer kullanıcı giriş yapmış ama auth sayfasındaysa → anasayfaya yönlendir
    if (authContext.isAuth && isOnAuthRoute) {
      navigate("/", { replace: true });
    }
  }, [
    authContext.initAuth,
    authContext.isLoading,
    authContext.isAuth,
    pathname,
    navigate,
    isOnAuthRoute,
  ]);

  // Eğer auth yüklenmemişse → loading göster
  if (!authContext.initAuth || authContext.isLoading) {
    return <Loading description="Bitte warten..." />;
  }

  // Doğru sayfa router tarafından basılacak
  return <Outlet />;
};

const RootStart: FC = () => {
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

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ProtectedRoutes />
      </UserContextProvider>
    </AuthContextProvider>
  );
};

const routes: NonIndexRouteObject[] = [
  {
    path: "/",
    element: <RootStart />,
    children: getSubNavigationsAsArray(AppRoutes), // burada tüm sayfalar Outlet üzerinden render edilir
  },
];

const router = createBrowserRouter(routes);

const Root: FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
