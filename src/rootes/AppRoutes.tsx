import {
  ArrowLoginIcon,
  GlobalSettingsIcon,
  LogoutIcon,
  SpieleladenIcon,
} from "icons";
import { NoRouteMatch } from "layout/NoRouteMatch";
import GlobalSettingsPage from "modules/basedata/globalsettings/globalsettingsDetails/GlobalSettingsPage";
import GlobalSettingsFormPage from "modules/basedata/globalsettings/globalsettingsForm/GlobalSettingsFormPage";
import Development from "modules/common/development/dev";
import Dashboard from "modules/dashboard";
import { USER_GROUPS } from "modules/usermanagement/roles/api";
import UserSettingsPage from "modules/usermanagement/usersettings/usersettingsDetails/UserSettingsPage";
import UserSettingsFormPage from "modules/usermanagement/usersettings/usersettingsForm/UserSettingsFormPage";
// Authentication Views
// Other Views
// import { Placeholder } from "modules/development/placeholder";

import ConfirmForgotPassword from "../auth/ConfirmForgotPassword";
import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import { AuthRoutes } from "./auth";

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
    element: <Dashboard />,
    icon: <SpieleladenIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.OFFICE, USER_GROUPS.ACCOUNTING],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },

  globalsettings: {
    key: "globalsettings",
    path: "/globalsettings",
    section: "admin",
    title: "Globale Einstellungen",
    element: <GlobalSettingsPage />,
    icon: <GlobalSettingsIcon />,
    groups: [USER_GROUPS.ADMIN],
    level: 0,
    navigation: true,
    indented: false,
    isWithParam: false,
    children: {
      globalsettingsedit: {
        key: "globalsettingsedit",
        path: "/globalsettings/edit",
        section: "admin",
        title: "Globale Einstellungen bearbeiten",
        element: <GlobalSettingsFormPage />,
        icon: <SpieleladenIcon />,
        groups: [USER_GROUPS.ADMIN],
        level: 1,
        navigation: false,
        indented: false,
        isWithParam: false,
        children: {},
      },
    },
  },
  logout: {
    key: "logout",
    path: "/logout",
    section: "account",
    title: "Ausloggen",
    element: <Logout />,
    icon: <LogoutIcon />,
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING, USER_GROUPS.OFFICE],
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
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING, USER_GROUPS.OFFICE],
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
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING, USER_GROUPS.OFFICE],
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
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING, USER_GROUPS.OFFICE],
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
    groups: [USER_GROUPS.ADMIN, USER_GROUPS.ACCOUNTING, USER_GROUPS.OFFICE],
    level: 0,
    navigation: false,
    indented: false,
    isWithParam: false,
    children: {},
  },
};

export default AppRoutes;
