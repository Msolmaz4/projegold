import {
  ArrowLoginIcon,
  GlobalSettingsIcon,
  LogoutIcon,
  SettingsIcon,
  SpieleladenIcon,
  TaskIcon,
} from "icons";
import { NoRouteMatch } from "../layout/NoRouteMatch";

import { USER_GROUPS } from "../modules/usermanagement/roles/api";

// Authentication Views
// Other Views
// import { Placeholder } from "modules/development/placeholder";

import ConfirmForgotPassword from "../auth/ConfirmForgotPassword";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import { AuthRoutes } from "./auth";
import MainLayout from "../components/MainLayout";
import RegisterPage from "../auth/Register";

/**
 * Routes by default exports the paths NOT under authentication.
 *
 * (!) Warning: Non navigation routes should not have navigation: true set
 * since they lack needed information
 *
 * (!) Warning: The order here is important, since we map over possible navigations
 * to render sidebar items
 */
const AppRoutes = {
  start: {
    key: "start",
    path: "/",
    section: "general",
    title: "Dashboard",
    element: <MainLayout />,
    icon: <SpieleladenIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },

  logout: {
    key: "logout",
    path: "/logout",
    section: "account",
    title: "Ausloggen",
    element: <Logout />,
    icon: <LogoutIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: true,
    indented: false,
    isWithParam: false,
    children: {},
  },
  login: {
    key: "login",
    path: AuthRoutes.login,
    section: "account",
    title: "Einloggen",
    element: <Login />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
  register: {
    key: "register",
    path: AuthRoutes.register,
    section: "account",
    title: "Register",
    element: <RegisterPage />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
  forgotPassword: {
    key: "forgotPassword",
    path: AuthRoutes.forgotPassword,
    section: "account",
    title: "Passwort vergessen",
    element: <ForgotPassword />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
  confirmForgotPassword: {
    key: "confirmForgotPassword",
    path: AuthRoutes.confirmForgotPassword,
    section: "account",
    title: "Passwort vergessen bestätigen",
    element: <ConfirmForgotPassword />,
    icon: <ArrowLoginIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },

  noRouteMatch: {
    key: "noRouteMatch",
    path: "*",
    section: "general",
    title: "Keine Route gefunden",
    element: <NoRouteMatch />,
    icon: <LogoutIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
};

export default AppRoutes;
