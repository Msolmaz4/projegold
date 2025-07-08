// src/Root.tsx
import { FC, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type NonIndexRouteObject,
} from "react-router-dom";

import UserContextProvider from "./context/user-context-provider";

//import MainLayout from "./components/MainLayout";
import Login from "./auth/Login";
import MainLayout from "./components/MainLayout";
import ForgotPasswordPage from "./auth/ForgotPassword";

const routes: NonIndexRouteObject[] = [
  {
    path: "/",
    element: (
      <UserContextProvider>
        <Suspense fallback={<div>warten bitte..</div>}>
          <ForgotPasswordPage />
        </Suspense>
      </UserContextProvider>
    ),
  },
];

const router = createBrowserRouter(routes);

const Root: FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
